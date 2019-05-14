import Vue from 'vue'
import VueResource from 'vue-resource'
import chaseOffers from '@/offers/chaseOffers'

Vue.use(VueResource)
Vue.config.devtools = true

// Global Event bus for communicating between components
const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  el: '#chase-offers',
  components: { chaseOffers }
})
