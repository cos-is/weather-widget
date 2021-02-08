<template>
  <div class="city-item">
    <div class="city-item_name">{{ cityName }}</div>
    <div class="city-item_temp">
      <img class="city-item_temp_img" :src="weatherIconURL" alt="">
      <div class="city-item_temp_value">{{ realTemp }}&#176;C</div>
    </div>
    <div class="city-item_weather-info">Feels like {{ feelsLikeTemp }}&#176;C. {{ weatherDesc }}</div>
  </div>
</template>

<script>
import { cardinalFromDegree } from 'cardinal-direction'
const visibilityDivider = 1000 // Meters to km
export default {
  props: {
    city: {
      type: Object
    }
  },
  computed: {
    cityName () {
      return `${this.city.name}, ${this.city.sys.country}`
    },
    weatherIconURL () {
      const [weather] = this.city.weather
      return `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    },
    weatherDesc () {
      // There's no description for the weather array in the docs.
      // So I'll assume it contains all current conditions and list them all just in case.
      return this.city.weather.reduce((weatherDesc, weather) => {
        let desc = weather.description
        desc = `${desc.charAt(0).toUpperCase()}${desc.slice(1)}.`
        return `${weatherDesc} ${desc}`
      }, '')
    },
    realTemp () {
      return this.city.main.temp
    },
    feelsLikeTemp () {
      return this.city.main.feels_like
    },
    wind () {
      const cardinalDirection = cardinalFromDegree(this.city.wind.deg)
      return `${this.city.wind.speed.toFixed(1)}m/s ${cardinalDirection}`
    },
    humidity () {
      return this.city.main.humidity
    },
    dewPoint () {

    },
    visibility () {
      const visibility = this.city.sys.visibility / visibilityDivider
      return visibility.toFixed(1)
    },
    pressure () {
      return this.city.main.pressure
    }
  }
}
</script>

<style>

</style>
