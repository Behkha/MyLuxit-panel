<template>
  <v-autocomplete rtl flat label="نویسندگان" :loading="loading" item-text="name" item-value="id" multiple cache-items chips required :items="items" :search-input.sync="search" v-model="select" class="select-tag"></v-autocomplete>
</template>

<script>
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
      fetchItems: function () {
        this.loading = true
        this.$store.dispatch('fetchAuthorsRequest')
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.items.push(response.data[i])
            }
            this.loading = false
          })
      }
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
    },
    mounted: function () {
      this.fetchItems()
    }
  }
</script>
<style>
  .select-tag{
    direction: rtl;
  }
</style>
