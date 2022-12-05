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
      <span class="hidden-sm-and-down white--text">پنل مدیریتی لوکسیت</span>
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
        text: 'پست ها',
        children: []
      }
      let EventsList = {
        icon: 'bubble_chart',
        text: 'رویداد ها',
        children: []
      }
      let PlacesList = {
        icon: 'place',
        text: 'مکان ها',
        children: []
      }
      let CategoriesList = {
        icon: 'dashboard',
        text: 'کتگوری ها',
        children: []
      }
      // let AuthorsList = {
      //   icon: 'border_color',
      //   text: 'نویسندگان',
      //   children: []
      // }
      // let PhotographersList = {
      //   icon: 'monochrome_photos',
      //   text: 'عکاس ها',
      //   children: []
      // }
      let TagsList = {
        icon: 'local_offer',
        text: 'تگ ها',
        children: []
      }
      let AdminList = {
        icon: 'adb',
        text: 'ادمین ها',
        children: []
      }

      let CharactersList = {
        icon: 'person',
        text: 'اشخاص',
        children: []
      }
      if (true) {
        AdminList.children.push({
          icon: 'add',
          text: 'ادمین جدید',
          route: 'CreateAdmin'
        })
        AdminList.children.push({
          icon: 'add',
          text: 'لیست ادمین ها',
          route: 'AdminsList'
        })

        CharactersList.children.push({
          icon: 'add',
          text: 'سلبریتی جدید',
          route: 'CreateCelebrity'
        })
        CharactersList.children.push({
          icon: 'add',
          text: 'لیست اشخاص',
          route: 'CharactersList'
        })
        CharactersList.children.push({
          icon: 'add',
          text: 'لیست انواع شخصیت',
          route: 'CharacterTypesList'
        })
        CharactersList.children.push({
          icon: 'add',
          text: 'ایجاد نوع شخصیت',
          route: 'CreateCharacterType'
        })

        PostsList.children.push({
          icon: 'add',
          text: 'پست جدید',
          route: 'CreatePost'
        })
        PostsList.children.push({
          icon: 'add',
          text: 'لیست پست ها',
          route: 'PostsList'
        })

        EventsList.children.push({
          icon: 'add',
          text: 'رویداد جدید',
          route: 'CreateEvent'
        })
        EventsList.children.push({
          icon: 'add',
          text: 'نوع رویداد جدید',
          route: 'CreateEventType'
        })
        EventsList.children.push({
          icon: 'add',
          text: 'لیست رویدادها',
          route: 'EventsList'
        })
        EventsList.children.push({
          icon: 'add',
          text: 'لیست انواع رویدادها',
          route: 'EventTypesList'
        })

        PlacesList.children.push({
          icon: 'add',
          text: 'مکان جدید',
          route: 'CreatePlace'
        })
        PlacesList.children.push({
          icon: 'add',
          text: 'نوع مکان جدید',
          route: 'CreatePlaceType'
        })
        PlacesList.children.push({
          icon: 'add',
          text: 'لیست مکانها',
          route: 'PlacesList'
        })
        PlacesList.children.push({
          icon: 'add',
          text: 'لیست انواع مکانها',
          route: 'PlaceTypesList'
        })

        CategoriesList.children.push({
          icon: 'add',
          text: 'کتگوری جدید',
          route: 'CreateCategory'
        })
        CategoriesList.children.push({
          icon: 'add',
          text: 'لیست کتگوری ها',
          route: 'CategoriesList'
        })
        //
        // AuthorsList.children.push({
        //   icon: 'add',
        //   text: 'نویسنده جدید',
        //   route: 'CreateAuthor'
        // })
        // AuthorsList.children.push({
        //   icon: 'add',
        //   text: 'لیست نویسندگان',
        //   route: 'AuthorsList'
        // })
        //
        // PhotographersList.children.push({
        //   icon: 'add',
        //   text: 'عکاس جدید',
        //   route: 'CreatePhotographer'
        // })
        // PhotographersList.children.push({
        //   icon: 'add',
        //   text: 'لیست عکاسان',
        //   route: 'PhotographersList'
        // })

        TagsList.children.push({
          icon: 'add',
          text: 'تگ جدید',
          route: 'CreateTag'
        })
        TagsList.children.push({
          icon: 'add',
          text: 'لیست تگ ها',
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
