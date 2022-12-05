// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import wysiwyg from 'vue-wysiwyg'
import { store } from './store/store'
import App from './App'
import router from './router'
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import Vddl from 'vddl'

import {
  Vuetify,
  VApp,
  VAutocomplete,
  VTextarea,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VTextField,
  VDivider,
  VTooltip,
  VDialog,
  VCard,
  VAvatar,
  VProgressCircular,
  VSelect,
  VProgressLinear,
  VChip,
  VDatePicker,
  VMenu,
  VTimePicker,
  VSwitch,
  VRadioGroup,
  VSnackbar,
  VDataTable,
  VSlider,
  VCheckbox
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VAutocomplete,
    VTextarea,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VTextField,
    VDivider,
    VTooltip,
    VDialog,
    VCard,
    VAvatar,
    VProgressCircular,
    VSelect,
    VProgressLinear,
    VChip,
    VDatePicker,
    VMenu,
    VTimePicker,
    VSwitch,
    VRadioGroup,
    VSnackbar,
    VDataTable,
    VSlider,
    VCheckbox
  },
  theme: {
    primary: '#8BC34A',
    secondary: '#1f3b42',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  rtl: true
})
Vue.use(Vuex)
Vue.use(wysiwyg, {hideModules: { image: true }}) // config is optional. more below
Vue.use(VueLodash, lodash)
Vue.use(Vddl)
Vue.component('persian-date-picker')
//VuePersianDatetimePicker
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
/*
  ,
  created () {
  Vue.http.interceptors.push(function (request, next) {
    // Add Authentication Token To All Requests
    // request.headers.set('Authorization', 'Bearer ' + store.getters.getToken)
    // request.headers.set('Accept', 'application/json')
    // Authentication Token Automate Refreshing
    // next((response) => {
    //   if (response.status === 401 && !(request.url === '/api/sessions/admins'))
    //     if (store.getters.isLoggedIn) {
    //       return Vue.http.put('/api/sessions').then((result) => {
    //         store.commit('setToken',result.data.token);
    //         return Vue.http(request).then((response) => {
    //           return response
    //         })
    //       },(result)=>{
    //         store.commit('loggedOut');
    //         return router.push({name: 'login'})
    //       })
    //     }
    // })
  })
} */
