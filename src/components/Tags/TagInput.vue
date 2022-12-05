<template>
<div style="display:flex ;flex-wrap: nowrap; align-items: center">
  <v-dialog v-model="dialog" persistent width="500">
    <v-btn slot="activator" color="green" flat icon small>
      <v-icon>add</v-icon>
    </v-btn>
    <v-card style="direction: rtl">
      <v-card-text style="padding-bottom: 0">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-text-field v-model="tagName" @keyup.enter="saveTag" ref="tagNameInput" label="نام تگ"></v-text-field>
          </v-layout>
        </v-container>
        <small v-if="tagSaved === true" class="green--text">تگ با موفقیت اضافه شد.</small>
        <small v-if="tagSaved === false" class="red--text">تگ ذخیره نشد. لطفا دوباره امتحان کنید .</small>
      </v-card-text>
      <v-card-actions>
        <v-btn outline color="green white-1 white--text" :loading="saveButtonLoading" @click.native="saveTag">ذخیره
        </v-btn>
        <v-btn outline class="mr-2" color="warning white-1 white--text" :disabled="closeButtonDisabled" @click.native="closeCreateTagDialog">بستن
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--<v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      color="white"
      hide-no-data
      hide-selected
      item-text="Description"
      item-value="API"
      label="Public APIs"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
      return-object
    ></v-autocomplete>-->

  <v-autocomplete :disabled="disabled" @keyup.enter="saveTagInstant" ref="tagsInput" rtl flat label="تگ ها" :loading="loading" item-text="name" item-value="id" multiple cache-items chips required :items="items" :search-input.sync="search"
    v-model="select" class="select-category"></v-autocomplete>
</div>
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
      dialog: false,
      saveButtonLoading: false,
      closeButtonDisabled: false,
      tagSaved: null,
      tagName: null,
      initialed: false,
      tagsInputAutoFocus: false
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true
      this.$store.dispatch('IndexTags', {})
        .then(response => {
          this.items = response.data.data
          this.loading = false

        })
    },
    fetchItems: lodash.debounce(function(keyword) {
      this.loading = true
      this.$store.dispatch('searchTagsRequest', keyword)
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.items.push(response.data[i])
          }
          this.loading = false
        })
    }, 500),
    saveTag() {
      this.saveButtonLoading = true
      this.closeButtonDisabled = true
      this.tagSaved = null
      this.$store.dispatch('createTagRequest', {
          name: this.tagName
        })
        .then(response => {
          this.saveButtonLoading = false
          this.closeButtonDisabled = false
          this.items.push({
            name: response.data.data.name,
            id: response.data.data.id
          })
          this.select.push(response.data.data.id)
          this.tagSaved = true
          this.closeCreateTagDialog()
        })
        .catch(error => {
          this.saveButtonLoading = false
          this.closeButtonDisabled = false
          this.tagSaved = false
          this.$store.dispatch('handleError', error)
        })
    },
    saveTagInstant() {
      this.dialog = true
      this.search = null
    },
    closeCreateTagDialog() {
      this.tagName = null
      this.tagSaved = null
      this.dialog = false
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
    select: function(val) {
      this.$emit('input', val)
      this.tagName = null
    },
    search(val) {
      val && this.fetchItems(val)
      if (val) {
        this.tagName = val
      }
    },
    value(val) {
      this.select = val
    },
    initialItems(val) {
      if (!this.initialed) {
        this.initialed = true
        this.items = val
        // for (let item of val) {
        //   this.items.push(item.name)
        // }
        for (let item of val) {
          this.select.push(parseInt(item.id))
        }
      }
    },
    dialog(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.tagNameInput.focus()
        })
      }
    }
  },
  mounted() {
    this.getDataFromApi();
  }
}
</script>
<style scoped>
.select-category {
  direction: rtl;
}
</style>
