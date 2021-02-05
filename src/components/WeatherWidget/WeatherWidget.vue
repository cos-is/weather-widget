<template>
  <div class="weather-widget">
    <div v-if="notice" class="weather-widget_notice">{{ notice }}</div>
    <div v-for="city in cities" :key="city.sys.id" class="weather-widget_city">{{ city.name }}</div>
  </div>
</template>

<script>
import { LocalStore } from '@/utils'
import { getWeatherData } from '@/api/weather.api'

const CitiesStore = new LocalStore('cities')

export default {
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
    addCity (city) {
      const cities = this.cities || []
      this.cities = [...cities, city]
      this.saveCities()
    },
    requestUserLocationCity () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const {
            latitude: lat,
            longitude: lon
          } = coords
          this.getCityData({ lat, lon })
        })
      }
    },
    saveCities () {
      CitiesStore.item = this.cities.map(city => city.name)
    },
    async getCityData (params = {}) {
      try {
        const city = await getWeatherData(params)
        this.addCity(city)
      } catch (e) {
        console.log(e)
      }
    },
    async requestSavedCities () {
      for (const city of CitiesStore.item) {
        await this.getCityData({ q: city })
      }
    }
  }
}
</script>

<style>

</style>
