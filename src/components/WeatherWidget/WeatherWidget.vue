<template>
  <div class="weather-widget">
    <div v-if="notice || cities.length === 0" class="weather-widget_notice">{{ notice || noticeList.noData }}</div>
    <city-item
      v-for="city in cities"
      :key="city.sys.id"
      :city="city"
      class="weather-widget_city"
    />
  </div>
</template>

<script>
import { LocalStore } from '@/utils'
import { getWeatherData } from '@/api/weather.api'
import CityItem from './CityItem'
import noticeList from './noticeList'

const CitiesStore = new LocalStore('cities')

export default {
  components: {
    CityItem
  },
  data () {
    return {
      cities: [],
      notice: null,
      settingsNotice: null,
    }
  },
  computed: {
    noticeList () {
      return noticeList
    }
  },
  created () {
    if (!CitiesStore.item) {
      this.requestUserLocationCity()
    } else {
      this.requestSavedCities()
    }
    window.addEventListener('online', this.requestSavedCities)
  },
  methods: {
    requestUserLocationCity () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const {
            latitude: lat,
            longitude: lon
          } = coords
          this.addCity({ lat, lon })
        })
      }
    },
    saveCities () {
      CitiesStore.item = this.cities.map(city => city.name)
    },
    async addCity (params = {}, save = true) {
      try {
        const city = await getWeatherData(params)
        if (!this.cities.some(cityItem => cityItem.id === city.id)) {
          this.cities = [...this.cities, city]
          this.settingsNotice = null
          this.notice = null
          if (save) {
            this.saveCities()
          }
        } else {
          this.settingsNotice = noticeList.cityExists
        }
      } catch ({ message, response }) {
        if (message === 'Network Error') {
          this.notice = noticeList.networkError
        } else {
          this.settingsNotice = noticeList[response.status] || noticeList.default
      }
      }
    },
    async requestSavedCities () {
      for (const city of CitiesStore.item) {
        await this.addCity({ q: city }, false)
      }
    }
  }
}
</script>

<style>

</style>
