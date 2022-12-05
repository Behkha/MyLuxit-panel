import Vue from 'vue'
import Vuex from 'vuex'
import {Authentication} from './modules/Authentication'
import {ApiMaster} from './modules/ApiMaster'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth: Authentication,
    API: ApiMaster
  }
})
