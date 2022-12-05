<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ویرایش کتگوری</h2>


    <form>

      <!-- Name -->
      <v-layout   class="wrap">


        <v-flex class="xs4 offset-xs1">
          <v-text-field label="نام" v-model="form.fields.name"></v-text-field>
        </v-flex>
        <v-flex class="xs2 ">
          <v-text-field type="number" min="1" max="1000" label="اولویت" v-model="form.fields.position"></v-text-field>
        </v-flex>
      </v-layout>

      <!-- Image -->
      <v-layout >
        <div class="file_input_container">
          <p>فایل تصویر خبر را انتخاب کنید .</p>
          <input type="file" ref="imageFileInput" accept=".jpg,.jpeg,.png" @change="submitImageFile">
        </div>
      </v-layout>
      <h3 style="direction: rtl; margin-bottom: 25px">تصویر فعلی</h3>
      <v-layout   class="wrap">
        <v-flex class="xs6">
          <img v-bind:src="img_src" style="width: 100%;height: 100%" alt="">
        </v-flex>
      </v-layout>


      <h3 style="direction: rtl; margin-bottom: 25px">تنظیمات فیلتر</h3>

      <!-- Check boxes -->
      <v-layout >
        <v-flex xs4>
          <v-checkbox label="رویداد" v-model="form.fields.event.active"></v-checkbox>
        </v-flex>
        <v-flex xs4>
          <v-checkbox label="مکان" v-model="form.fields.place.active"></v-checkbox>
        </v-flex>
      </v-layout>

      <!-- Event -->
      <v-layout >
        <v-flex xs12 class="event-layout">
          <h2>رویداد</h2>
          <v-layout >

            <v-flex class="xs4 offset-xs1">
              <tag-input v-model="form.fields.event.tags" :initial-items="initialEventTags"
                         :disabled="!form.fields.event.active"></tag-input>
            </v-flex>
            <v-flex class="xs4">
              <event-type-input v-model="form.fields.event.types"
                                :disabled="!form.fields.event.active"></event-type-input>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Place -->
      <v-layout >
        <v-flex xs12 class="event-layout" style="margin-top: 20px">
          <h2>مکان</h2>
          <v-layout >

            <v-flex class="xs4 offset-xs1">
              <tag-input v-model="form.fields.place.tags" :initial-items="initialPlaceTags"
                         :disabled="!form.fields.place.active"></tag-input>
            </v-flex>
            <v-flex class="xs4">
              <place-type-input v-model="form.fields.place.types"
                                :disabled="!form.fields.place.active"></place-type-input>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Place -->
      <v-layout >
        <v-flex xs12 class="event-layout" style="margin-top: 20px;margin-bottom: 20px;">
          <h2>کلی</h2>
          <v-layout >
            <v-flex class="xs9 offset-xs1">
              <tag-input :initial-items="initialTags" v-model="form.fields.tags"
                         :disabled="!form.fields.place.active && !form.fields.event.active"></tag-input>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout >

        <v-btn class="form__submit" @click="submitForm" outline color="warning white-1 white--text" large
               :loading="form.submitButtonLoading"
               :disabled="submitButtonDisabled">اعمال ویرایش
        </v-btn>



        <v-dialog v-model="dialog" persistent width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" outline large color="red white-1 white--text">حذف کتگوری
            </v-btn>
          </template>
          <v-card>
            <v-card-title>تایید عملیات حذف</v-card-title>

            <v-card-text>آیا واقعا میخواهید این کتگوری را حذف کنید ؟</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="deleteCategory($route.params.id) ">
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
        <v-btn class="form__submit" @click="PicChange" outline color="warning white-1 white--text" large
               :loading="form.submitButtonLoading"
               :disabled="PicChangeButtonDisabled">تغییر عکس
        </v-btn>
      </v-layout>


    </form>

    <!-- General Snack Bars -->
    <v-snackbar :timeout=5000 color="success" v-model="form.submitted" style="direction: rtl">
      با موفقیت انجام شد.
      <v-btn flat @click.native="form.submitted = false">باشه</v-btn>
    </v-snackbar>
    <v-snackbar :timeout=5000 color="error" v-model="form.notSubmitted" style="direction: rtl">
      خطایی رخ داده است.
      <v-btn flat @click.native="form.notSubmitted = false">باشه</v-btn>
    </v-snackbar>
    <!-- General Snack Bars -->

  </v-container>
</template>
<script>
  import TagInput from '../../../components/Tags/TagInput'
  import EventTypeInput from '../../../components/Events/EventMultyTypeInput'
  import PlaceTypeInput from '../../../components/Places/PlaceMultyTypeInput'

  export default {
    data: () => {
      return {
        initialTags: [],
        initialEventTags: [],
        initialPlaceTags: [],
        img_src: '',
        dialog: false,
        form: {
          fields: {
            name: null,
            image: null,
            position: null,
            event: {
              active: false,
              tags: [],
              types: []
            },
            place: {
              active: false,
              tags: [],
              types: []
            },
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
      TagInput,
      EventTypeInput,
      PlaceTypeInput
    },
    watch: {},
    methods: {
      PicChange () {
        let form = new FormData()
        form.append('image', this.form.fields.image)
        let data = {
          'id' : this.$route.params.id,
          'image' : form
        }
        this.$store.dispatch('UpdateCategoryPicture',data)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            setTimeout(() => {
              this.$router.push({name: 'CategoriesList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      submitForm () {
        let data = {
          'name': this.form.fields.name,
          'image': this.form.fields.image,
          'position': this.form.fields.position,
          'tags': this.form.fields.tags,
          'event_filters': [],
          'place_filters': []
        }
        if (this.form.fields.event.active) {
          data.event_filters = {
            tags: this.form.fields.event.tags,
            types: this.form.fields.event.types
          }
        }
        if (this.form.fields.place.active) {
          data.place_filters = {
            tags: this.form.fields.place.tags,
            types: this.form.fields.place.types
          }
        }

        // const form = new FormData()
        // form.append('name', this.form.fields.name)
        // form.append('image', this.form.fields.image)
        // form.append('position', this.form.fields.position)
        // form.append('tags', JSON.stringify(this.form.fields.tags))
        // form.append('_method', 'PUT')
        // if (this.form.fields.event.active) {
        //   form.append('event_filters', JSON.stringify({
        //     tags: this.form.fields.event.tags,
        //     types: this.form.fields.event.types
        //   }))
        // }
        // else {
        //   form.append('event_filters', null)
        // }
        // if (this.form.fields.place.active) {
        //   form.append('place_filters', JSON.stringify({
        //     tags: this.form.fields.place.tags,
        //     types: this.form.fields.place.types
        //   }))
        // }
        // else {
        //   form.append('place_filters', null)
        // }
        this.form.submitButtonLoading = true
        let obj = {
          'id': this.$route.params.id,
          // 'form': JSON.stringify(data)
          'form': data
        }
        this.$store.dispatch('editCategoryRequest', obj)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'CategoriesList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      deleteCategory (id) {
        this.$store.dispatch('deleteCategoryRequest', id)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'CategoriesList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      clearForm () {
        this.form.fields = {
          name: null,
          image: null,
          event: {
            active: false,
            tags: [],
            types: []
          },
          place: {
            active: false,
            tags: [],
            types: []
          },
          tags: []
        }
        this.$refs.imageFileInput.value = ''
      },
      initialForm () {
        this.$store.dispatch('showCategory', this.$route.params.id)
          .then(response => {
            let result = response.data.category
            this.img_src = result.image
            if (!this.img_src.startsWith('http')) {
              this.img_src = 'http://' + this.img_src
            }
            this.form.fields = {
              name: result.name,
              image: result.image,
              position: result.position,
              tags: [],
              event: {
                active: false,
                tags: [],
                types: []
              },
              place: {
                active: false,
                tags: [],
                types: []
              }
            }
            this.initialTags = result.tags_objects
            // this.form.fields.tags = temp_tags_array
            if (result.place_filters_objects) {
              let temp_arr = []
              result.place_filters.types.forEach(function (item) {
                temp_arr.push(parseInt(item))
              })
              this.form.fields.place = {
                active: true,
                tags: [],
                types: temp_arr
              }
              this.initialPlaceTags = result.place_filters_objects.tags
            }
            if (result.event_filters_objects) {
              let temp_arr = []
              result.event_filters.types.forEach(function (item) {
                temp_arr.push(parseInt(item))
              })
              this.form.fields.event = {
                active: true,
                tags: [],
                types: temp_arr
              }
              this.initialEventTags = result.event_filters_objects.tags
            }
          })
      },
      submitImageFile () {
        this.form.fields.image = this.$refs.imageFileInput.files[0]
      }
    },
    computed: {
      PicChangeButtonDisabled () {
        let hasImage = !Boolean(this.form.fields.image)
        return hasImage
      },
      submitButtonDisabled () {
        let hasName = this.form.fields.name
        let hasImage = this.form.fields.image
        let placeIsActive = this.form.fields.place.active
        let eventIsActive = this.form.fields.event.active
        let placeOrEventIsActive = placeIsActive || eventIsActive
        // let placeHasAFullFieldOrMainTag = placeIsActive && (placeTags.length > 0 || placeTypes.length > 0 || tags.length > 0)
        // let eventHasAFullFieldOrMainTag = eventIsActive && (eventTags.length > 0 || eventTypes.length > 0 || tags.length > 0)
        return !(Boolean(hasName &&
          hasImage &&
          placeOrEventIsActive
        ))
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
      text-align: right;
      direction: rtl;
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
    .file_input_container {
      direction: rtl;
      background-color: #424242;
      margin-left: 25px;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 1px 2px 4px #222;
      margin-bottom: 20px;

    }
    .event-layout {
      background-color: #424242;
      box-shadow: 1px 2px 4px #222;
      padding: 30px;
      h2 {
        direction: rtl;
      }
    }
  }
</style>
