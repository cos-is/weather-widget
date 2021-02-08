<template>
  <div class="city-item">
    <div class="city-item_name">{{ cityName }}</div>
    <div class="city-item_temp">
      <img class="city-item_temp_img" :src="weatherIconURL" alt="">
      <div class="city-item_temp_value">{{ realTemp }}&#176;C</div>
    </div>
    <div class="city-item_weather-info">Feels like {{ feelsLikeTemp }}&#176;C. {{ weatherDesc }}</div>
    <div class="city-item_props">
      <div class="city-item_props_item">
        <svgicon class="city-item_cardinal" :style="{ transform: `rotate(${-windDeg}deg)` }" original name="cardinal-direction" />
        {{ wind }}
      </div>
      <div class="city-item_props_item">
        <svgicon original name="barometer" />
        {{ pressure }}hPa
      </div>
      <div class="city-item_props_item">
        Humidity: {{ humidity }}%
      </div>
      <div class="city-item_props_item">
        Visibility: {{ visibility }}km
      </div>
    </div>
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
    windDeg () {
      return this.city.wind.deg
    },
    humidity () {
      return this.city.main.humidity
    },
    visibility () {
      const visibility = this.city.visibility / visibilityDivider
      return visibility.toFixed(1)
    },
    pressure () {
      return this.city.main.pressure
    }
  }
}
</script>

<style lang="scss">
  .city-item {
    &:not(:last-child) {
      margin-bottom: 50px;
    }
  }
  .city-item_name {
    font-size: 16px;
    font-weight: 500;
  }
  .city-item_cardinal {
    transform-origin: 50% 50%;
  }
  .city-item_props {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 10px;
    font-size: 14px;
  }
  .city-item_props_item {
    display: flex;
    align-items: center;
    & .svg-icon {
      margin-right: 10px;
    }
  }
  .city-item_temp {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .city-item_temp_value {
    font-size: 26px;
    font-weight: 500;
  }
  .city-item_weather-info {
    margin-bottom: 20px;
  }
</style>
