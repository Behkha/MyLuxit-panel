<template>
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">لیست انواع رویدادها</h2>
    <v-layout>
      <v-flex xs12>
        <div>
          <v-card>
            <v-data-table
              :headers="headers"
              :items="items"
              :pagination.sync="pagination"
              :total-items="totalItems"
              :loading="loading"
              class="elevation-1"
              style="direction: rtl"
              :rows-per-page-items="[15]"
              rows-per-page-test="تعداد در هر صفحه"
              :disable-initial-sort="true"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{props.item.id}}</td>
                <td class="text-xs-right">{{props.item.name}}</td>
                <td class="text-xs-center">
                  <v-btn outline @click="operation(props.item.id)" color="green white-1 white--text">ویرایش یا حذف</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
          <v-layout>
            <v-flex xs12>
              <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pagesNumber"></v-pagination>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import lodash from 'lodash'
  import VPagination from '../../../../node_modules/vuetify/es5/components/VPagination'

  export default {
    data: function () {
      return {
        deleteDialog: {
          show: false,
          item: null,
          agreeButtonLoading: false,
          denyButtonDisabled: false,
          successful: false,
          failed: false
        },
        archiveDialog: {
          show: false,
          item: null,
          agreeButtonLoading: false,
          denyButtonDisabled: false,
          successful: false,
          failed: false
        },
        search: '',
        lastSearch: '',
        tempSearch: '',
        totalItems: 0,
        items: [],
        loading: true,
        pagination: {
          sortBy: 'publish_at'
        },
        headers: [
          {text: 'ID', value: 'name', align: 'right', sortable: false},
          {text: 'نام نوع رویداد', value: 'name', align: 'right', sortable: false},
          {text: 'عملیات', value: 'edit', align: 'center', sortable: false},
        ]
      }
    },
    watch: {
      pagination: {
        handler () {
          if (this.pagination.sortBy && this.pagination.descending) {
            this.removeSort()
          } else if (this.pagination.sortBy && !this.pagination.descending) {
            this.getDataFromApi(this.pagination)
          } else {
            this.getDataFromApi(this.pagination)
          }
        },
        deep: true
      },
      tempSearch: lodash.debounce(function (val) {
        if (val !== this.search) {
          this.search = val
          this.getDataFromApi()
        }
      }, 500)
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        this.$store.dispatch('IndexEventTypes', {
          page: this.pagination.page,
          sort: {by: this.pagination.sortBy, desc: this.pagination.descending},
          filters: {draft: this.showDrafts.toString(), publish_limit: 'false', keyword: this.search}
        })
          .then(response => {
            this.items = response.data.data
            this.loading = false
            if (!this.totalItems || this.search || this.lastSearch) {
              this.totalItems = response.data.meta.total
            }
            this.lastSearch = this.search
          })
      },
      operation (id) {
        this.$router.push({name: 'EventTypeEdit', params: {id: id}})
      },
      removeSort () {
        this.pagination.sortBy = null
      },
      showDeleteDialog (item) {
        this.deleteDialog.item = item
        this.deleteDialog.show = true
      },
      deleteItem () {
        this.deleteDialog.agreeButtonLoading = true
        this.deleteDialog.denyButtonDisabled = true
        this.$store.dispatch('deleteNewRequest', this.deleteDialog.item.id)
          .then(response => {
            const deletedItemIndex = this.items.indexOf(this.deleteDialog.item)
            this.items.splice(deletedItemIndex, 1)
            this.hideDeleteDialog()
            this.deleteDialog.successful = true
          })
          .catch(error => {
            this.hideDeleteDialog()
            this.deleteDialog.failed = true
          })
      },
      hideDeleteDialog () {
        this.deleteDialog.agreeButtonLoading = false
        this.deleteDialog.denyButtonDisabled = false
        this.deleteDialog.show = false
        this.deleteDialog.item = null
      },
      showArchiveDialog (item) {
        this.archiveDialog.item = item
        this.archiveDialog.show = true
      },
      hideArchiveDialog () {
        this.archiveDialog.agreeButtonLoading = false
        this.archiveDialog.denyButtonDisabled = false
        this.archiveDialog.show = false
        this.archiveDialog.item = null
      },
      toggleArchiveItem () {
        this.archiveDialog.agreeButtonLoading = true
        this.archiveDialog.denyButtonDisabled = true
        this.$store.dispatch('editNewDraftStatus', {
          id: this.archiveDialog.item.id,
          value: !this.archiveDialog.item.is_draft
        })
          .then(response => {
            const toggledItem = this.items.indexOf(this.archiveDialog.item)
            this.items.splice(toggledItem, 1)
            this.hideArchiveDialog()
            this.archiveDialog.successful = true
          })
          .catch(error => {
            this.hideArchiveDialog()
            this.archiveDialog.failed = true
          })
      }
    },
    computed: {
      pagesNumber () {
        return Math.ceil(this.totalItems / 15)
      }
    },
    components:{
      VPagination
    },
    props: {
      showDrafts: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*.datatable__actions__range-controls {
    ;
  }*/
</style>



