import Vue from 'vue'
// Vuex4 是为 Vue3 设计的状态管理库，Vue2 需要使用 Vuex3 或者更早的版本
import Vuex from 'vuex'

import http from '../util/http'

import city from './CityStore/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    city: city
  }
})
