import Vue from 'vue'
import svgicon from 'vue-svgicon'
import '@/icons'
import WeatherWidget from '@/components/WeatherWidget/WeatherWidget'

Vue.config.productionTip = false

Vue.use(svgicon, { tagName: 'svgicon' })

new Vue({
  components: {
    WeatherWidget
  }
}).$mount('#app')
