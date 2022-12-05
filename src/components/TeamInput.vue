<template>
  <v-autocomplete rtl flat label="تیم ها" :loading="loading" item-text="name" item-value="id" multiple cache-items chips required :items="items" :search-input.sync="search" v-model="select" class="select-team">
    <template slot="selection" slot-scope="data">
      <v-chip close @input="data.parent.selectItem(data.item)" :selected="data.selected" class="chip--select-multi" :key="JSON.stringify(data.item)">
        <v-avatar>
          <img :src="data.item.logo_path">
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template slot="item" slot-scope="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-avatar>
          <img :src="data.item.logo_path">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
  import lodash from 'lodash'
  export default {
    data: () => {
      return {
        items: [],
        loading: false,
        search: null,
        select: [],
        initialed: false
      }
    },
    methods: {
      fetchItems: lodash.debounce(function (keyword) {
        this.loading = true
        this.$store.dispatch('searchTeamsRequest', keyword)
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.items.push(response.data[i])
            }
            this.loading = false
          })
      }, 500)
    },
    props: {
      value: Array,
      initialItems: {
        type: Array,
        default: null
      }
    },
    watch: {
      select: function (val) {
        this.$emit('input', val)
      },
      search (val) {
        val && this.fetchItems(val)
      },
      value (val) {
        this.select = val
      },
      initialItems (val) {
        if (!this.initialed) {
          this.initialed = true
          this.items = val
          for (let item of val) {
            this.select.push(item.id)
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .select-team{
    direction: rtl;
    .chip {
      direction: ltr;
    }
  }
</style>
