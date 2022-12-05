/* eslint-disable no-trailing-spaces,spaced-comment,no-multiple-empty-lines */

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const DOMAIN_URL = 'https://api-test.myluxit.ir/'
const API_VER = 'v3'
const BASE_URL = DOMAIN_URL + API_VER + '/'
const STORAGE_URL = 'https://file-test.myluxit.ir/'
export const ApiMaster = {

  actions: {
    //Base
    fetchUserDataRequest ({getters}) {
      return getters.axios.get('admins/self')
    },
    loginRequest ({getters}, credentials) {
      return getters.axios.post('sessions/admins', credentials)
    },
    logoutRequest ({getters}) {
      return getters.axios.delete('sessions/admins')
    },
    handleError ({getters, dispatch}, error) {
      console.log(error.response)
      if (error.response.status === 401 && error.method !== 'login') {
        dispatch('logout')
      }
    },

    // Admins

    CreateAdmin ({getters}, admin) {
      return getters.axios.post(`admins`, admin)
    },
    IndexAdmins ({getters}, data) {
      return getters.axios.get(`admins?page=` + data.page)
    },
    deleteAdminRequest ({getters}, id) {
      return getters.axios.delete(`admins/${id}`)
    },
    editAdmin ({getters}, data) {
      return getters.axios.put(`admins/${data.id}`, data)
    },
    showAdmin ({getters},id) {
      return getters.axios.get(`admins/${id}`)
    },

    //Post
    createPostRequest ({getters}, post) {
      return getters.axios.post(`posts`, post)
    },
    IndexPosts ({getters}, data) {
      return getters.axios.get(`posts?page=` + data.page)
    },
    editPostRequest ({getters}, data) {
      return getters.axios.put(`posts/${data.id}`, data)
      // return getters.axios.put(`posts/${data.id}?postable_id=${data.postable_id}&postable_type=${data.postable_type}&publish_at=${data.publish_at}&occur_at=${data.occur_at}&subtitle=${data.subtitle}&tags=${data.tags}`)

    },
    deletePostRequest ({getters}, id) {
      return getters.axios.delete(`posts/${id}`)
    },
    showPost ({getters}, id) {
      return getters.axios.get(`posts/${id}`)
    },

    // Characters

    fetchCharactersRequest ({getters}) {
      return getters.axios.get(`characters`)
    },
    IndexCharacters ({getters}, data) {
      return getters.axios.get(`characters?page=` + data.page)
    },
    IndexCharactersQ ({getters}) {
      return getters.axios.get(`characters`)
    },
    createCelebritiesRequest ({getters}, character) {
      return getters.axios.post(`celebrities`, character)
    },
    editCelebritiesRequest ({getters}, {id, form}) {
      // return getters.axios.put(`celebrities/${id}?title=${form.title}&bio=${form.bio}&media=form.media&contact=${form.contact}&types=${form.types}`)
      return getters.axios.put(`celebrities/${id}`, form)
    },
    showCharacter ({getters}, id) {
      return getters.axios.get(`celebrities/${id}`)
    },
    showCharacterTypes ({getters}) {
      return getters.axios.get(`characters/types/`)
    },
    deleteCharacterRequest ({getters}, id) {
      return getters.axios.delete(`celebrities/${id}`)
    },
    createCharacterTypeRequest ({getters}, form) {
      return getters.axios.post(`characters/types`, form)
    },
    IndexCharacterTypes ({getters}, data) {
      return getters.axios.get(`characters/types?page=` + data.page)
    },
    showCharacterType ({getters}, id) {
      return getters.axios.get(`characters/types/${id}`)
    },
    editCharacterTypeRequest ({getters}, {id, title}) {
      return getters.axios.put(`characters/types/${id}?title=${title}`)
    },
    deleteCharacterTypeRequest ({getters}, id) {
      return getters.axios.delete(`characters/types/${id}`)
    },

    //Event
    createEventRequest ({getters}, event) {
      return getters.axios.post(`events`, event)
    },
    fetchEventTypesRequest ({getters}) {
      return getters.axios.get(`events/types`)
    },
    IndexEvents ({getters}, data) {
      return getters.axios.get(`events?page=` + data.page)
    },
    createEventTypeRequest ({getters}, form) {
      return getters.axios.post(`events/types`, form)
    },
    IndexEventTypes ({getters}, data) {
      return getters.axios.get(`events/types?page=` + data.page)
    },
    IndexEventTypesQ ({getters}) {
      return getters.axios.get(`events/types`)
    },
    editEventTypeRequest ({getters}, {id, name}) {
      return getters.axios.put(`events/types/${id}?name=${name}`)
    },
    deleteEventTypeRequest ({getters}, id) {
      return getters.axios.delete(`events/types/${id}`)
    },
    showEventType ({getters}, id) {
      return getters.axios.get(`events/types/${id}`)
    },
    editEventRequest ({getters}, {id, form}) {
      // let ph = JSON.stringify(form.photographers)
      // let ch = JSON.stringify(form.characters)
      // let md = JSON.stringify(form.media)
      // let dt = JSON.stringify(form.details)
      // let ath = JSON.stringify(form.authors)
      // let lk = JSON.stringify(form.links)
      // let tg = JSON.stringify(form.tags)

      // return getters.axios.put(`events/${id}?title=${form.title}&content=${form.content}&subtitle=${form.subtitle}&media=${md}&links=${lk}&type_id=${form.type_id}&authors=${ath}&photographers=${ph}&tags=${tg}&starts_at=${form.starts_at}&ends_at=${form.ends_at}&characters=${ch}&details=${dt}`)
      // let ph = []
      // form.photographers.forEach(function (item) {
      //   ph.push(item.id)
      // })
      return getters.axios.put(`events/${id}`, form)
    },
    deleteEventRequest ({getters}, id) {
      return getters.axios.delete(`events/${id}`)
    },
    showEvent ({getters}, id) {
      return getters.axios.get(`events/${id}`)
    },

    //Place
    createPlaceRequest ({getters}, place) {
      return getters.axios.post(`places`, place)
    },
    fetchPlaceTypesRequest ({getters}) {
      return getters.axios.get(`places/types`)
    },
    IndexPlaces ({getters}, data) {
      return getters.axios.get(`places?page=` + data.page)
    },
    IndexPlacesQ ({getters}) {
      return getters.axios.get(`places`)
    },
    createPlaceTypeRequest ({getters}, form) {
      return getters.axios.post(`places/types`, form)
    },
    IndexPlaceTypes ({getters}, data) {
      return getters.axios.get(`places/types?page=` + data.page)
    },
    IndexPlaceTypesQ ({getters}) {
      return getters.axios.get(`places/types`)
    },
    editPlaceTypeRequest ({getters}, {id, name}) {
      return getters.axios.put(`places/types/${id}?name=${name}`)
    },
    deletePlaceTypeRequest ({getters}, id) {
      return getters.axios.delete(`places/types/${id}`)
    },
    showPlaceType ({getters}, id) {
      return getters.axios.get(`places/types/${id}`)
    },
    showPlace ({getters}, id) {
      return getters.axios.get(`places/${id}`)
    },
    deletePlaceRequest ({getters}, id) {
      return getters.axios.delete(`places/${id}`)
    },
    editPlaceRequest ({getters}, {id, form}) {
      return getters.axios.put(`places/${id}`, form)
    },
    IndexCities ({getters}) {
      return getters.axios.get(`cities/`)
    },

    //Category
    createCategoryRequest ({getters}, form) {
      return getters.axios.post(`categories`, form)
    },
    IndexCategories ({getters}, data) {
      return getters.axios.get(`categories?page=` + data.page)
    },
    showCategory ({getters}, id) {
      return getters.axios.get(`categories/${id}`)
    },
    deleteCategoryRequest ({getters}, id) {
      return getters.axios.delete(`categories/${id}`)
    },
    UpdateCategoryPicture ({getters}, {id, image}) {
      return getters.axios.post(`categories/${id}/image`, image)
    },
    editCategoryRequest ({getters}, {id, form}) {
      // return getters.axios.put(`categories/${id}?name=${form.name}&position=${form.position}&tags=${form.tags}&event_filters=${form.event_filters}&place_filters=${form.place_filters}`)
      return getters.axios.put(`categories/${id}`, form)
    },

    //Tag
    createTagRequest ({getters}, tag) {
      return getters.axios.post(`tags`, tag)
    },
    editTagRequest ({getters}, {id, name}) {
      return getters.axios.put(`tags/${id}?name=${name}`)
    },
    deleteTagRequest ({getters}, id) {
      return getters.axios.delete(`tags/${id}`)
    },
    showTag ({getters}, id) {
      return getters.axios.get(`tags/${id}`)
    },
    IndexTags ({getters}, data) {
      return getters.axios.get(`tags?page=` + data.page)
    },

    //Author
    createAuthorRequest ({getters}, author) {
      return getters.axios.post(`authors`, author)
    },
    fetchAuthorsRequest ({getters}) {
      return getters.axios.get(`authors`)
    },
    IndexAuthors ({getters}, data) {
      return getters.axios.get('authors?page=' + data.page)
    },
    showAuthor ({getters}, id) {
      return getters.axios.get(`authors/${id}`)
    },
    deleteAuthorRequest ({getters}, id) {
      return getters.axios.delete(`authors/${id}`)
    },
    editAuthorRequest ({getters}, {id, name}) {
      return getters.axios.put(`authors/${id}?name=${name}`)
    },

    //Photographer
    createPhotographerRequest ({getters}, photographer) {
      return getters.axios.post(`photographers`, photographer)
    },
    fetchPhotographersRequest ({getters}) {
      return getters.axios.get(`photographers`)
    },
    IndexPhotographers ({getters}, data) {
      return getters.axios.get(`photographers?page=` + data.page)
    },
    deletePhotographerRequest ({getters}, id) {
      return getters.axios.delete(`photographers/${id}`)
    },
    editPhotographerRequest ({getters}, {id, name}) {
      return getters.axios.put(`photographers/${id}?name=${name}`)
    },
    showPhotographer ({getters}, id) {
      return getters.axios.get(`photographers/${id}`)
    },

    //Search
    searchTagsRequest ({getters}, keyword) {
      return getters.axios.get(`search/tags?keyword=${keyword}`)
    },
    searchPlacesRequest ({getters}, keyword) {
      return getters.axios.get(`search/places?query=${keyword}`)
    },
    searchEventsRequest ({getters}, keyword) {
      return getters.axios.get(`search/events?query=${keyword}`)
    }
  },
  state: {},
  getters: {
    getBaseUrl () {
      return BASE_URL
    },
    axios (state, getters) {
      return Axios.create({
        baseURL: BASE_URL,
        headers: {
          Authorization: 'Bearer ' + getters.getToken
        }
      })
    },
    getStorageUrl () {
      return STORAGE_URL
    }
  },
  mutations: {}
}
