import Vue from 'vue'
import './styles'
import WeatherWidget from '@/components/WeatherWidget/WeatherWidget'

Vue.config.productionTip = false

new Vue({
  components: {
    WeatherWidget
  }
}).$mount('#app')
