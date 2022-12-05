<template>
  <v-autocomplete rtl flat label="منبع خبر" :loading="loading" item-text="name" item-value="id"  cache-items chips required :items="items" :search-input.sync="search" v-model="select" class="select-team">
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
  export default {
    data: () => {
      return {
        items: [],
        loading: false,
        search: null,
        select: null,
        initialed: false
      }
    },
    methods: {
      fetchItems: function () {
        this.loading = true
        this.$store.dispatch('fetchSourceRequest')
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.items.push(response.data[i])
            }
            this.loading = false
          })
      }
    },
    props: {
      value: Number,
      initialItems: {
        type: Array,
        default: null
      }
    },
    watch: {
      select: function (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.select = val
      },
      initialItems (val) {
        if (!this.initialed) {
          this.initialed = true
          this.items = val
          this.select = val[0].id
        }
      }
    },
    mounted: function () {
      this.fetchItems()
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
