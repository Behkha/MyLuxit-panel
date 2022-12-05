import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../../router'

Vue.use(Vuex)

export const Authentication = {

  state: {
    status: localStorage.hasOwnProperty('token'), // true : logged in , false : failed , 'activation' : not activated
    pending: false,
    failed: false,
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    privileges: localStorage.getItem('privileges'),
    token: localStorage.getItem('token')
  },
  getters: {
    isLoggedIn: (state) => {
      return state.status
    },
    isPending: (state) => {
      return state.pending
    },
    getToken: state => {
      return state.token
    },
    getName: state => {
      return state.name
    },
    getUserName: state => {
      return state.username
    },
    getUserPrivileges: state => {
      if (state.privileges) {
        return state.privileges.split(',')
      } else {
        return null
      }
    },
    isFailed: state => {
      return state.failed
    }
  },
  mutations: {
    inLogin (state) {
      state.pending = true
      state.failed = false
    },
    loggedIn (state) {
      state.status = true
      state.pending = false
      state.failed = false
    },
    loggedOut (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('name')
      localStorage.removeItem('privileges')
      state.status = false
      state.name = null
      state.username = null
      state.privileges = null
      state.token = null
    },
    failed (state) {
      state.failed = true
      state.pending = false
    },
    setUser (state, payload) {
      state.name = payload.name
      state.usernam = payload.username
      state.privileges = payload.privileges.toString()
      localStorage.setItem('name', payload.name)
      localStorage.setItem('username', payload.username)
      localStorage.setItem('privileges', payload.privileges)
    },
    setToken (state, payload) {
      state.token = payload
      localStorage.setItem('token', payload)
    }
  },
  actions: {
    login ({commit, dispatch, getters}, credentials) {
      return new Promise(resolve => {
        commit('inLogin')
        dispatch('loginRequest', credentials)
          .then(response => {
            commit('setToken', response.data.access_token)
            commit('loggedIn')
            dispatch('fetchUser')
              .then(() => {
                resolve()
              })
          })
          .catch(error => {
            commit('failed')
            dispatch('handleError', {method: 'login', response: error.response})
            resolve()
          })
      })
    },
    logout ({commit, dispatch, getters}) {
      if (!getters.isLoggedIn) {
        return
      }
      dispatch('logoutRequest')
        .then((response) => {
          commit('loggedOut')
          router.push({name: 'Login'})
        })
        .catch(error => {
          commit('loggedOut')
          dispatch('errorHandler', error)
        })
    },
    fetchUser ({dispatch, commit}) {
      return new Promise(resolve => {
        dispatch('fetchUserDataRequest')
          .then(response => {
            commit('setUser', response.data)
            resolve()
          })
          .catch(error => {
            dispatch('handleError', {method: 'login', response: error.response})
            resolve()
          })
      })
    }
  }
}
