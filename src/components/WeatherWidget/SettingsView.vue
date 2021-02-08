<template>
  <div class="settings-view">
    <div class="settings-view_header">
      Settings
      <icon-button icon="close" @click="$emit('close')" />
    </div>
    <draggable :value="cities" @input="updateCities" class="settings-view_cities">
      <div
        v-for="city in cities"
        :key="city.id"
        class="settings-view_cities_item"
      >

        <svgicon name="handle" original />
        <span class="settings-view_cities_item_name">
          {{ getName(city) }}
        </span>
        <icon-button @click="removeCity(city)" icon="trash" />
      </div>
    </draggable>
    <form @submit.prevent="addCity" class="settings-view_add">
      <h4>Add location:</h4>
      <div class="settings-view_add_field">
        <input type="text" class="input" v-model="cityName">
        <icon-button icon="enter" />
      </div>
      <div v-if="notice" class="settings-view_add_notice">
        {{ notice }}
      </div>
    </form>
  </div>
</template>

<script>
import IconButton from '@ui/IconButton'
import Draggable from 'vuedraggable'
export default {
  components: {
    IconButton,
    Draggable
  },
  props: {
    cities: {
      type: Array
    },
    notice: {
      type: String
    }
  },
  data () {
    return {
      cityName: ''
    }
  },
  methods: {
    getName (city) {
      return `${city.name}, ${city.sys.country}`
    },
    addCity () {
      if (this.cityName) {
        this.$emit('add-city', { q: this.cityName })
        this.cityName = ''
      }
    },
    removeCity (city) {
      const cities = this.cities.filter(cityItem => cityItem.id !== city.id)
      this.updateCities(cities)
    },
    updateCities (cities) {
      this.$emit('update-cities', cities)
    }
  }
}
</script>

<style lang="scss">
  .settings-view {
    position: absolute;
    background: #fff;
    z-index: 5;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 20px;
  }
  .settings-view_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .settings-view_cities_item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background: var(--c-grey-light);
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
  .settings-view_cities_item_name {
    margin-right: auto;
    margin-left: 10px;
  }
  .settings-view_add_field {
    display: flex;
    & input {
      flex-grow: 1;
    }
  }
  .settings-view_cities {
    margin-bottom: 40px;
  }
  .settings-view_add_notice {
    padding: 10px;
    margin-top: 10px;
    background: var(--c-red);
  }
</style>
