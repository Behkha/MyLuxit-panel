<template>
<v-app id="inspire" dark>
  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer" right>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-btn flat icon color="grey" style="position:relative;right: 15px;" @click="logout">
            <v-icon>power_settings_new</v-icon>
          </v-btn>

        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense>
      <template v-for="item in menuItems">
        <v-list-group style="direction: rtl" v-if="item.children" v-model="item.model" :key="item.text" append-icon="keyboard_arrow_up" :prepend-icon="item.icon">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title style="padding-right: 0">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile style="direction: ltr" v-for="(child, i) in item.children" :key="i" @click="openRoute(child.route)">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="child.icon" style="min-width: 40px;margin-right: 15px;">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list-group>
        <v-list-tile v-else @click="" :key="item.text">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action style="min-width: 35px;">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar color="light-green" app :clipped-right="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title class="">
      <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down white--text">?????? ?????????????? ????????????</span>
    </v-toolbar-title>
  </v-toolbar>
  <v-content>
    <router-view></router-view>
  </v-content>
  <!--<v-btn fab bottom right color="light-green" dark fixed @click="openCreateNewLink">
      <v-icon>add</v-icon>
    </v-btn>-->
</v-app>
</template>

<script>
/* eslint-disable no-trailing-spaces */

export default {
  data: () => ({
    dialog: false,
    drawer: null
  }),
  methods: {
    openRoute(route) {
      if (this.$router.currentRoute.name !== route) {
        this.$router.push({
          name: route
        })
      }
    },
    logout() {
      this.$store.dispatch('logout')
    },
    openCreateNewLink() {
      this.$router.push({
        name: 'CreateNew'
      })
    }
  },
  props: {
    source: String
  },
  computed: {
    name() {
      return this.$store.getters.getName
    },
    menuItems() {
      let menu = []
      let privileges = this.$store.getters.getUserPrivileges
      let PostsList = {
        icon: 'rss_feed',
        text: '?????? ????',
        children: []
      }
      let EventsList = {
        icon: 'bubble_chart',
        text: '???????????? ????',
        children: []
      }
      let PlacesList = {
        icon: 'place',
        text: '???????? ????',
        children: []
      }
      let CategoriesList = {
        icon: 'dashboard',
        text: '???????????? ????',
        children: []
      }
      // let AuthorsList = {
      //   icon: 'border_color',
      //   text: '??????????????????',
      //   children: []
      // }
      // let PhotographersList = {
      //   icon: 'monochrome_photos',
      //   text: '???????? ????',
      //   children: []
      // }
      let TagsList = {
        icon: 'local_offer',
        text: '???? ????',
        children: []
      }
      let AdminList = {
        icon: 'adb',
        text: '?????????? ????',
        children: []
      }

      let CharactersList = {
        icon: 'person',
        text: '??????????',
        children: []
      }
      if (true) {
        AdminList.children.push({
          icon: 'add',
          text: '?????????? ????????',
          route: 'CreateAdmin'
        })
        AdminList.children.push({
          icon: 'add',
          text: '???????? ?????????? ????',
          route: 'AdminsList'
        })

        CharactersList.children.push({
          icon: 'add',
          text: '?????????????? ????????',
          route: 'CreateCelebrity'
        })
        CharactersList.children.push({
          icon: 'add',
          text: '???????? ??????????',
          route: 'CharactersList'
        })
        CharactersList.children.push({
          icon: 'add',
          text: '???????? ?????????? ??????????',
          route: 'CharacterTypesList'
        })
        CharactersList.children.push({
          icon: 'add',
          text: '?????????? ?????? ??????????',
          route: 'CreateCharacterType'
        })

        PostsList.children.push({
          icon: 'add',
          text: '?????? ????????',
          route: 'CreatePost'
        })
        PostsList.children.push({
          icon: 'add',
          text: '???????? ?????? ????',
          route: 'PostsList'
        })

        EventsList.children.push({
          icon: 'add',
          text: '???????????? ????????',
          route: 'CreateEvent'
        })
        EventsList.children.push({
          icon: 'add',
          text: '?????? ???????????? ????????',
          route: 'CreateEventType'
        })
        EventsList.children.push({
          icon: 'add',
          text: '???????? ????????????????',
          route: 'EventsList'
        })
        EventsList.children.push({
          icon: 'add',
          text: '???????? ?????????? ????????????????',
          route: 'EventTypesList'
        })

        PlacesList.children.push({
          icon: 'add',
          text: '???????? ????????',
          route: 'CreatePlace'
        })
        PlacesList.children.push({
          icon: 'add',
          text: '?????? ???????? ????????',
          route: 'CreatePlaceType'
        })
        PlacesList.children.push({
          icon: 'add',
          text: '???????? ????????????',
          route: 'PlacesList'
        })
        PlacesList.children.push({
          icon: 'add',
          text: '???????? ?????????? ????????????',
          route: 'PlaceTypesList'
        })

        CategoriesList.children.push({
          icon: 'add',
          text: '???????????? ????????',
          route: 'CreateCategory'
        })
        CategoriesList.children.push({
          icon: 'add',
          text: '???????? ???????????? ????',
          route: 'CategoriesList'
        })
        //
        // AuthorsList.children.push({
        //   icon: 'add',
        //   text: '?????????????? ????????',
        //   route: 'CreateAuthor'
        // })
        // AuthorsList.children.push({
        //   icon: 'add',
        //   text: '???????? ??????????????????',
        //   route: 'AuthorsList'
        // })
        //
        // PhotographersList.children.push({
        //   icon: 'add',
        //   text: '???????? ????????',
        //   route: 'CreatePhotographer'
        // })
        // PhotographersList.children.push({
        //   icon: 'add',
        //   text: '???????? ????????????',
        //   route: 'PhotographersList'
        // })

        TagsList.children.push({
          icon: 'add',
          text: '???? ????????',
          route: 'CreateTag'
        })
        TagsList.children.push({
          icon: 'add',
          text: '???????? ???? ????',
          route: 'TagsList'
        })
      }
      if (PostsList.children.length > 0) {
        menu.push(PostsList)
      }
      if (CharactersList.children.length > 0) {
        menu.push(CharactersList)
      }
      if (EventsList.children.length > 0) {
        menu.push(EventsList)
      }
      if (PlacesList.children.length > 0) {
        menu.push(PlacesList)
      }
      if (CategoriesList.children.length > 0) {
        menu.push(CategoriesList)
      }
      // if (PhotographersList.children.length > 0) {
      //   menu.push(PhotographersList)
      // }
      // if (AuthorsList.children.length > 0) {
      //   menu.push(AuthorsList)
      // }
      if (TagsList.children.length > 0) {
        menu.push(TagsList)
      }
      if (AdminList.children.length > 0) {
        menu.push(AdminList)
      }
      return menu

    }
  }
}
</script>


<style>
@import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

.editr {
  direction: rtl !important;
}

.editr--content {
  background: white !important;
}
</style>
