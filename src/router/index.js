/* eslint-disable no-trailing-spaces,spaced-comment */
import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store'

import LoginPage from '@/pages/LoginPage'
import ControlPanel from '@/pages/ControlPanel'

import CreateAuthorPage from '@/pages/ControlPanelSubPages/Authors/CreateAuthor'
import AuthorsListPage from '@/pages/ControlPanelSubPages/Authors/AuthorsListPage'
import AuthorEditPage from '@/pages/ControlPanelSubPages/Authors/AuthorEditPage'
import CreateEventPage from '@/pages/ControlPanelSubPages/Events/CreateEvent'
import CreatePhotographerPage from '@/pages/ControlPanelSubPages/Photographers/CreatePhotographer'
import PhotographersListPage from '@/pages/ControlPanelSubPages/Photographers/PhotographersListPage'
import PhotographerEditPage from '@/pages/ControlPanelSubPages/Photographers/PhotographerEditPage'
import CreatePlacePage from '@/pages/ControlPanelSubPages/Places/CreatePlace'
import CreatePostPage from '@/pages/ControlPanelSubPages/Posts/CreatePost'
import PostEditPage from '@/pages/ControlPanelSubPages/Posts/PostEditPage'
import PostsListPage from '@/pages/ControlPanelSubPages/Posts/PostsListPage'
import CreateTagPage from '@/pages/ControlPanelSubPages/Tags/CreateTag'
import TagEditPage from '@/pages/ControlPanelSubPages/Tags/TagEditPage'
import TagsListPage from '@/pages/ControlPanelSubPages/Tags/TagsListPage'
import CreateEventTypePage from '@/pages/ControlPanelSubPages/Events/CreateEventType'
import CreatePlaceTypePage from '@/pages/ControlPanelSubPages/Places/CreatePlaceType'
import PlaceTypesListPage from '@/pages/ControlPanelSubPages/Places/PlaceTypesListPage'
import PlaceEditPage from '@/pages/ControlPanelSubPages/Places/PlaceEditPage'
import PlacesListPage from '@/pages/ControlPanelSubPages/Places/PlacesListPage'
import PlaceTypeEditPage from '@/pages/ControlPanelSubPages/Places/PlaceTypeEditPage'
import EventTypesListPage from '@/pages/ControlPanelSubPages/Events/EventTypesListPage'
import EventsListPage from '@/pages/ControlPanelSubPages/Events/EventsListPage'
import EventEditPage from '@/pages/ControlPanelSubPages/Events/EventEditPage'
import EventTypeEditPage from '@/pages/ControlPanelSubPages/Events/EventTypeEditPage'
import CreateCategoryPage from '@/pages/ControlPanelSubPages/Categories/CreateCategory'
import CategoriesListPage from '@/pages/ControlPanelSubPages/Categories/CategoriesListPage'
import CategoryEditPage from '@/pages/ControlPanelSubPages/Categories/CategoryEditPage'
import CreateCelebrityPage from '@/pages/ControlPanelSubPages/Characters/CreateCelebrityPage'
import CharactersListPage from '@/pages/ControlPanelSubPages/Characters/CharactersListPage'
import CharacterEditPage from '@/pages/ControlPanelSubPages/Characters/CharacterEditPage'
import CharacterTypeEditPage from '@/pages/ControlPanelSubPages/Characters/CharacterTypeEditPage'
import CharacterTypesListPage from '@/pages/ControlPanelSubPages/Characters/CharacterTypesListPage'
import CreateCharacterType from '@/pages/ControlPanelSubPages/Characters/CreateCharacterType'
import CreateAdminPage from '@/pages/ControlPanelSubPages/Admins/CreateAdminPage'
import AdminsListPage from '@/pages/ControlPanelSubPages/Admins/AdminsListPage'
import AdminEditPage from '@/pages/ControlPanelSubPages/Admins/AdminEditPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/panel',
      name: 'Panel',
      component: ControlPanel,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isLoggedIn) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
      children: [
        //Admins
        {
          path: 'admins/create',
          component: CreateAdminPage,
          name: 'CreateAdmin',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'admins/list',
          component: AdminsListPage,
          name: 'AdminsList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'admins/:id',
          component: AdminEditPage,
          name: 'AdminEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },


        //Characters
        {
          path: 'celebrity/create',
          component: CreateCelebrityPage,
          name: 'CreateCelebrity',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'characters/list',
          component: CharactersListPage,
          name: 'CharactersList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'characters/type/list',
          component: CharacterTypesListPage,
          name: 'CharacterTypesList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'characters/type/create',
          component: CreateCharacterType,
          name: 'CreateCharacterType',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'characters/type/:id',
          component: CharacterTypeEditPage,
          name: 'CharacterTypeEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'characters/:id',
          component: CharacterEditPage,
          name: 'CharacterEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },


        //Post
        {
          path: 'posts/create',
          component: CreatePostPage,
          name: 'CreatePost',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'posts/list',
          component: PostsListPage,
          name: 'PostsList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'posts/:id',
          component: PostEditPage,
          name: 'PostEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },


        //Place
        {
          path: 'places/create',
          component: CreatePlacePage,
          name: 'CreatePlace',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'places/type/create',
          component: CreatePlaceTypePage,
          name: 'CreatePlaceType',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'places/type/list',
          component: PlaceTypesListPage,
          name: 'PlaceTypesList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'places/list',
          component: PlacesListPage,
          name: 'PlacesList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'place/type/:id',
          component: PlaceTypeEditPage,
          name: 'PlaceTypeEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'places/:id',
          component: PlaceEditPage,
          name: 'PlaceEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        //Event

        {
          path: 'events/create',
          component: CreateEventPage,
          name: 'CreateEvent',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'events/list',
          component: EventsListPage,
          name: 'EventsList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'events/type/create',
          component: CreateEventTypePage,
          name: 'CreateEventType',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'events/type/list',
          component: EventTypesListPage,
          name: 'EventTypesList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'events/type/:id',
          component: EventTypeEditPage,
          name: 'EventTypeEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'events/:id',
          component: EventEditPage,
          name: 'EventEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },

        //Category
        {
          path: 'categories/create',
          component: CreateCategoryPage,
          name: 'CreateCategory',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'categories/list',
          component: CategoriesListPage,
          name: 'CategoriesList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'categories/:id',
          component: CategoryEditPage,
          name: 'CategoryEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        //Tag
        {
          path: 'tags/create',
          component: CreateTagPage,
          name: 'CreateTag',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'tags/list',
          component: TagsListPage,
          name: 'TagsList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'tags/:id',
          component: TagEditPage,
          name: 'TagEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },

        //Author
        {
          path: 'authors/create',
          component: CreateAuthorPage,
          name: 'CreateAuthor',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'authors/list',
          component: AuthorsListPage,
          name: 'AuthorsList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'authors/:id',
          component: AuthorEditPage,
          name: 'AuthorEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },

        //Photographer
        {
          path: 'photographers/create',
          component: CreatePhotographerPage,
          name: 'CreatePhotographer',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'photographers/list',
          component: PhotographersListPage,
          name: 'PhotographersList',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
        {
          path: 'photographers/:id',
          component: PhotographerEditPage,
          name: 'PhotographerEdit',
          beforeEnter: (to, from, next) => {
            next()
          }
        },
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLoggedIn) {
          next({name: 'Panel'})
        } else {
          next()
        }
      }
    }
  ]
})
