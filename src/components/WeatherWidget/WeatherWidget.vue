<template>
  <div class="weather-widget">
    <div v-if="notice || cities.length === 0" class="weather-widget_notice">{{ notice || noticeList.noData }}</div>
    <icon-button icon="settings" class="weather-widget_toggle-settings" @click="openSettings" />
    <city-item
      v-for="city in cities"
      :key="city.id"
      :city="city"
      class="weather-widget_city"
    />
    <fade-transition>
      <settings-view v-if="settingsVisible" :notice="settingsNotice" :cities="cities" @add-city="addCity" @update-cities="updateCities" @close="closeSettings" />
    </fade-transition>
  </div>
</template>

<script>
import { LocalStore } from '@/utils'
import { getWeatherData } from '@/api/weather.api'
import CityItem from './CityItem'
import IconButton from '@ui/IconButton'
import { FadeTransition } from 'vue2-transitions'
import SettingsView from './SettingsView'
import noticeList from './noticeList'

const CitiesStore = new LocalStore('cities')

export default {
  components: {
    CityItem,
    IconButton,
    FadeTransition,
    SettingsView
  },
  data () {
    return {
      cities: [],
      notice: null,
      settingsNotice: null,
      settingsVisible: false
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
    },
    openSettings () {
      this.settingsVisible = true
    },
    closeSettings () {
      this.settingsVisible = false
    },
    updateCities (cities) {
      this.cities = cities
      this.saveCities()
    }
  }
}
</script>

<style lang="scss">
  .weather-widget {
    --c-grey: #484848;
    --c-grey-light: #e3e3e3;
    --c-red: #f48f8f;
    display: inline-block;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    position: relative;
    min-width: 200px;
    &,
    & * {
      box-sizing: border-box;
    }
  }
  .svg-icon {
    width: 20px;
    height: 20px;
    color: var(--c-grey);
  }
  .weather-widget_toggle-settings {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  .weather-widget_notice {
    padding: 20px;
    margin-top: 30px;
    background: var(--c-grey-light);
  }
</style>
