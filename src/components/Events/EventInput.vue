<template>
  <v-autocomplete rtl flat label=" رویداد" :loading="loading" item-text="title" item-value="id" cache-items chips :items="items" :search-input.sync="search" v-model="select" class="select-tag"></v-autocomplete>
</template>

<script>
  import lodash from 'lodash'
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
      fetchItems: lodash.debounce(function (keyword) {
        this.loading = true
        this.$store.dispatch('searchEventsRequest', keyword)
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.items.push(response.data[i])
            }
            this.loading = false
          })
      }, 500)
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
      search (val) {
        val && this.fetchItems(val)
      },
      initialItems (val) {
        if (!this.initialed) {
          this.initialed = true
          this.items = val
          // for (let item of val) {
          //   this.items.push(item.name)
          // }
          for (let item of val) {
            this.select.push(item.id)
          }
        }
      },
      value (val) {
        this.select = val
      }
    }
  }
</script>
<style>
  .select-tag{
    direction: rtl;
  }
</style>
