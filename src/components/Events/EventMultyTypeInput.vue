<template>
  <v-autocomplete rtl flat label="نوع رویداد" :disabled="disabled" :loading="loading" item-text="name" multiple item-value="id"  cache-items chips required :items="items" :search-input.sync="search" v-model="select" class="select-team"></v-autocomplete>
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
        this.$store.dispatch('fetchEventTypesRequest')
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
      },
      disabled: {
        type: Boolean,
        default: false
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
<style lang="scss" scoped>
  .select-team{
    direction: rtl;
    .chip {
      direction: ltr;
    }
  }
</style>
