<template>
  <v-autocomplete rtl flat label="نوع مکان" :loading="loading" item-text="name" item-value="id"  cache-items chips required :items="items" :search-input.sync="search" v-model="select" class="select-team"></v-autocomplete>
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
        this.$store.dispatch('fetchPlaceTypesRequest')
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
