<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ویرایش پست</h2>


    <form>
      <!-- Publish DateTime -->
      <v-layout style="" class="wrap">
        <v-flex class="xs2 offset-xs1">
          <v-menu ref="dateMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width
                  :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.publishDate"
                  style="">
            <v-text-field slot="activator" label="تاریخ انتشار" v-model="form.fields.publishDate" prepend-icon="event"
                          readonly></v-text-field>
            <v-date-picker locale="fa-Ar" type="date" v-model="form.fields.publishDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">انصراف</v-btn>
              <v-btn flat color="primary" @click="$refs.dateMenu.save(form.fields.publishDate)">تایید</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex class="xs2">
          <v-menu ref="timeMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width
                  :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.publishTime"
                  style=""
                  @input="value => value && $refs.pickerP && ($refs.pickerP.selectingHour = true)">
            <v-text-field slot="activator" label="زمان انتشار" v-model="form.fields.publishTime"
                          prepend-icon="access_time" readonly></v-text-field>
            <v-time-picker ref="pickerP" format="24hr" v-model="form.fields.publishTime"
                           @change="$refs.timeMenu.save(form.fields.publishTime)"></v-time-picker>
          </v-menu>
        </v-flex>

      </v-layout>

      <!-- occur DateTime -->
      <v-layout style="" class="wrap">
        <v-flex class="xs2  offset-xs1">
          <v-menu ref="dateOccueMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y
                  full-width :nudge-right="40" max-width="290px" min-width="290px"
                  :return-value.sync="form.fields.occurDate" style="">
            <v-text-field slot="activator" label="تاریخ رخداد" v-model="form.fields.occurDate" prepend-icon="event"
                          readonly></v-text-field>
            <v-date-picker locale="fa-Ar" type="date" v-model="form.fields.occurDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">انصراف</v-btn>
              <v-btn flat color="primary" @click="$refs.dateOccueMenu.save(form.fields.occurDate)">تایید</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex class="xs2">
          <v-menu ref="timeOccurMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y
                  full-width :nudge-right="40" max-width="290px" min-width="290px"
                  :return-value.sync="form.fields.occurTime" style=""
                  @input="value => value && $refs.pickerO && ($refs.pickerO.selectingHour = true)">
            <v-text-field slot="activator" label="زمان رخداد" v-model="form.fields.occurTime" prepend-icon="access_time"
                          readonly></v-text-field>
            <v-time-picker ref="pickerO" format="24hr" v-model="form.fields.occurTime"
                           @change="$refs.timeOccurMenu.save(form.fields.occurTime)"></v-time-picker>
          </v-menu>
        </v-flex>

      </v-layout>

      <!-- Event Or Place -->
      <v-layout class="wrap">
        <v-flex xs2>
          <v-radio-group v-model="form.fields.postable_type">
            <v-radio color="success" label="رویداد" value="event"></v-radio>
            <v-radio label="مکان" value="place"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs4>
          <place-input :initial-items="initialPlace" v-model="form.fields.postable_id"
                       v-if="form.fields.postable_type === 'place'"></place-input>
          <event-input :initial-items="initialEvent" v-model="form.fields.postable_id"
                       v-else-if="form.fields.postable_type === 'event'"></event-input>
        </v-flex>

      </v-layout>

      <v-layout class="wrap">
        <v-flex xs4>
          <tag-input :initial-items="initialTags" v-model="form.fields.tags"></tag-input>
        </v-flex>
      </v-layout>
      <v-layout class="wrap">
        <v-flex class="xs4 offset-xs2">
          <v-text-field label="عنوان فرعی" v-model="form.fields.subtitle"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout class="wrap">
        <v-flex class="xs4 offset-xs2">
          <v-autocomplete multiple rtl flat label="شهر" item-text="name"
                          item-value="id" chips :items="allCities" v-model="form.fields.cities"
                          style=""></v-autocomplete>
        </v-flex>
      </v-layout>
      <v-layout>


        <v-dialog v-model="dialog" persistent width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" outline large color="red white-1 white--text">حذف پست
            </v-btn>
          </template>
          <v-card>
            <v-card-title>تایید عملیات حذف</v-card-title>

            <v-card-text>آیا واقعا میخواهید این پست را حذف کنید ؟</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="deletePost($route.params.id) ">
                بله
              </v-btn>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
              >
                خیر
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn class="form__submit" @click="submitForm" outline color="warning white-1 white--text" large
               :loading="form.submitButtonLoading"
               :disabled="submitButtonDisabled">اعمال ویرایش
        </v-btn>
      </v-layout>

    </form>

    <!-- General Snack Bars -->
    <v-snackbar :timeout=5000 color="success" v-model="form.submitted" style="">
      با موفقیت انجام شد.
      <v-btn flat @click.native="form.submitted = false">باشه</v-btn>
    </v-snackbar>
    <v-snackbar :timeout=5000 color="error" v-model="form.notSubmitted" style="">
      خطایی رخ داده است.
      <v-btn flat @click.native="form.notSubmitted = false">باشه</v-btn>
    </v-snackbar>
    <!-- General Snack Bars -->

  </v-container>
</template>
<script>
  import PlaceInput from '../../../components/Places/PlaceInput'
  import EventInput from '../../../components/Events/EventInput'
  import TagInput from '../../../components/Tags/TagInput'

  export default {
    data: () => {
      return {
        allCities: [],
        initial_over: false,
        initialTags: [],
        initialPlace: [],
        initialEvent: [],
        dialog: false,
        form: {
          fields: {
            cities: [],
            subtitle: null,
            publishTime: null,
            publishDate: null,
            occurTime: null,
            occurDate: null,
            postable_type: 'place',
            postable_id: null,
            tags: []
          },
          rules: {},
          submitButtonLoading: false,
          submitted: false,
          notSubmitted: false
        }
      }
    },
    components: {
      PlaceInput,
      EventInput,
      TagInput
    },
    /*
        watch: {
          'form.fields.postable_type': {
            handler: function () {
              this.form.fields.postable_id = null
            }
          }
        },
    */
    methods: {
      submitForm() {
        let data = this.form.fields
        data.occur_at = this.form.fields.occurDate + ' ' + this.form.fields.occurTime
        data.publish_at = this.form.fields.publishDate + ' ' + this.form.fields.publishTime
        data.id = this.$route.params.id

        //let form = this.form.fields
        //form.occur_at = this.form.fields.occurDate + ' ' + this.form.fields.occurTime
        //form.publish_at = this.form.fields.publishDate + ' ' + this.form.fields.publishTime
        this.form.submitButtonLoading = true
        this.$store.dispatch('editPostRequest', data)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            setTimeout(() => {
              this.$router.push({name: 'PostsList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      deletePost(id) {
        this.$store.dispatch('deletePostRequest', id)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'PostsList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      clearForm() {
        this.form.fields = {
          publishTime: null,
          publishDate: null,
          occurTime: null,
          occurDate: null,
          postable_type: 'place',
          postable_id: null,
          tags: []
        }
      },
      initialForm() {
        this.$store.dispatch('IndexCities')
          .then(response => {
            let db_cities = response.data
            let local_cities = []
            db_cities.forEach(function (item) {
                local_cities.push({
                  'id': item.id,
                  'name': item.name
                })
            })
            this.allCities = local_cities
          })
          .catch(error => {
            this.$store.dispatch('handleError', error)
          })
        let nowDate = new Date()
        this.form.fields.publishDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
        this.form.fields.occurDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
        this.form.fields.publishTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
        this.form.fields.occurTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)

        this.$store.dispatch('showPost', this.$route.params.id)
          .then(response => {
            let result = response.data
            this.form.fields = {
              postable_type: result.postable_type,
              subtitle: result.subtitle,
              publishTime: result.publish_at_hi.slice(result.publish_at.indexOf(' ') + 1).substr(0, 5),
              publishDate: result.publish_at_hi.substr(0, result.publish_at.indexOf(' ')),
              occurTime: result.occur_at_hi.slice(result.occur_at.indexOf(' ') + 1).substr(0, 5),
              occurDate: result.occur_at_hi.substr(0, result.occur_at.indexOf(' ')),
              postable_id: result.postable.id,
              cities: [],
              tags: []
            }
            let response_cities_array = []
            result.cities.forEach(function (item) {
              response_cities_array.push(item.id)
            })
            this.form.fields.cities = response_cities_array
            if (result.tags) {
              this.initialTags = result.tags
            }
            if (result.postable.postable_type === 'event') {
              // this.initialEvent = [{
              //   'id': result.postable.id,
              //   'title': result.postable.title
              // }]
              this.initialEvent.push(result.postable)
            }
            if (result.postable.postable_type === 'place') {
              this.initialPlace = [{
                'id': result.postable.id,
                'name': result.postable.name
              }]
            }
            this.$watch('form.fields.postable_type', () => {
              this.form.fields.postable_id = null
            })
          })
      }
    },
    computed: {
      submitButtonDisabled() {
        let disabled = Boolean(this.form.fields.publishDate &&
          this.form.fields.publishTime &&
          this.form.fields.occurDate &&
          this.form.fields.occurTime &&
          this.form.fields.subtitle &&
          this.form.fields.postable_id)
        return !disabled
      }
    },
    mounted: function () {
      this.initialForm()
    }
  }
</script>
<style lang="scss" scoped>
  form {
    input, textarea {
      text-align: right;;
    }
    .form__submit {
    }
    .input-group.input-group--selection-controls.notify-switch {
      padding-right: 10px;
      padding-top: 20px;
      label {
        padding-right: 24px;
      }
    }
  }
</style>
