<template>
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">افزودن کتگوری جدید</h2>


    <form>

      <!-- Name -->
      <v-layout   class="wrap">


        <v-flex class="xs4 offset-xs1">
          <v-text-field label="نام" v-model="form.fields.name"></v-text-field>
        </v-flex>
        <v-flex class="xs2">
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
              <tag-input v-model="form.fields.event.tags" :disabled="!form.fields.event.active"></tag-input>
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
              <tag-input v-model="form.fields.place.tags" :disabled="!form.fields.place.active"></tag-input>
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
              <tag-input v-model="form.fields.tags"
                         :disabled="!form.fields.place.active && !form.fields.event.active"></tag-input>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout >
        <v-btn class="form__submit" @click="submitForm" color="primary" large :loading="form.submitButtonLoading"
               :disabled="submitButtonDisabled">تایید و ارسال
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
      submitForm () {
        let form = new FormData()
        form.append('name', this.form.fields.name)
        form.append('image', this.form.fields.image)
        form.append('position', this.form.fields.position)
        for (var i=0;i<this.form.fields.tags.length;i++){
          form.append('tags[]',this.form.fields.tags[i])
        }
        if (this.form.fields.event.active) {
          for (let j=0;j<this.form.fields.event.tags.length;j++){
            form.append('event_filters[tags][]',parseInt(this.form.fields.event.tags[j]))
          }
          for (let k=0;k<this.form.fields.event.types.length;k++){
            form.append('event_filters[types][]',parseInt(this.form.fields.event.types[k]))
          }
        }
        else {
          let tmp_array = []
          form.append('event_filters', tmp_array)
        }
        if (this.form.fields.place.active) {
          for (let j=0;j<this.form.fields.place.tags.length;j++){
            form.append('place_filters[tags][]',parseInt(this.form.fields.place.tags[j]))
          }
          for (let k=0;k<this.form.fields.place.types.length;k++){
            form.append('place_filters[types][]',parseInt(this.form.fields.place.types[k]))
          }
        }
        else {
          let tmp_array = []
          form.append('place_filters', tmp_array)
        }

        // let data = {
        //   'name': this.form.fields.name,
        //   'image': this.form.fields.image,
        //   'position': this.form.fields.position,
        //   'tags': JSON.stringify(this.form.fields.tags),
        //   'event_filters': null,
        //   'place_filters': null
        // }
        // if (this.form.fields.event.active) {
        //   data.event_filters = JSON.stringify({
        //     tags: this.form.fields.event.tags,
        //     types: this.form.fields.event.types
        //   })
        // }
        // if (this.form.fields.place.active) {
        //   data.place_filters = JSON.stringify({
        //     tags: this.form.fields.place.tags,
        //     types: this.form.fields.place.types
        //   })
        // }

        this.form.submitButtonLoading = true

        this.$store.dispatch('createCategoryRequest', form)
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
      },
      submitImageFile () {
        this.form.fields.image = this.$refs.imageFileInput.files[0]
      }
    },
    computed: {
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
