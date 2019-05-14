import Vue from 'vue'
import Router from 'vue-router'

import chaseOffers from '@/offers/chaseOffers'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'chaseOffers',
    component: chaseOffers
  }]
})
