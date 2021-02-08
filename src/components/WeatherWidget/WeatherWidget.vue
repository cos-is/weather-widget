<template>
  <div class="weather-widget">
    <div v-if="notice" class="weather-widget_notice">{{ notice }}</div>
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

const CitiesStore = new LocalStore('cities')

export default {
  components: {
    CityItem
  },
  data () {
    return {
      cities: [],
      notice: null
    }
  },
  created () {
    if (!CitiesStore.item) {
      this.requestUserLocationCity()
    } else {
      this.requestSavedCities()
    }
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
          if (save) {
            this.saveCities()
          }
        }
      } catch (e) {
        console.log(e)
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
