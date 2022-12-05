<template>
<v-container>
  <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">افزودن رویداد جدید</h2>


  <form>

    <!-- Title Input + Place Type Input -->
    <v-layout class="wrap">

      <v-flex class="xs4 offset-xs2">
        <v-text-field label="عنوان" v-model="form.fields.title"></v-text-field>
      </v-flex>
      <v-flex class="xs4">
        <event-type-input v-model="form.fields.type_id"></event-type-input>
      </v-flex>


    </v-layout>

    <!-- Content Input -->
    <v-layout class="wrap">
      <v-flex class="xs10">
        <v-textarea outline type="text" placeholder="محتوا" v-model="form.fields.content" style="direction: rtl"></v-textarea>
      </v-flex>
    </v-layout>


    <!-- Tag input + link input -->
    <v-layout class="wrap">
      <v-flex class="xs4  offset-xs2">
        <tag-input v-model="form.fields.tags"></tag-input>
      </v-flex>

      <v-flex class="xs4">
        <v-text-field label="لینک وبسایت" v-model="form.fields.links.website.link"></v-text-field>
      </v-flex>

    </v-layout>


    <!-- Authors input + Photographers input -->
    <!-- <v-layout   class="wrap">


        <v-flex class="xs4  offset-xs2">
          <authors-input v-model="form.fields.authors"></authors-input>
        </v-flex>
        <v-flex class="xs4">
          <photographers-input v-model="form.fields.photographers"></photographers-input>
        </v-flex>
      </v-layout> -->

    <v-layout class="wrap">

      <v-flex class="xs4 offset-xs2">
        <v-text-field label="عنوان فرعی" v-model="form.fields.subtitle"></v-text-field>
      </v-flex>
      <v-flex class="xs4">
        <place-input v-model="form.fields.place_id"></place-input>
      </v-flex>
    </v-layout>
    <!--address-->
    <v-layout class="wrap">

      <v-flex class="xs10">
        <v-text-field label="آدرس" v-model="form.fields.details.address.content"></v-text-field>
      </v-flex>
    </v-layout>

    <!--price + tell-->
    <v-layout class="wrap">

      <v-flex class="xs4  offset-xs2">
        <v-text-field type="number" label="تلفن" v-model="form.fields.details.tell.content"></v-text-field>
      </v-flex>
      <v-flex class="xs4">
        <v-text-field type="price" label="قیمت بلیط به تومان" v-model="form.fields.details.price.content"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout class="wrap">

      <v-flex class="xs4 offset-xs2">
        <v-autocomplete multiple rtl flat label="شهر" item-text="name" item-value="id" chips :items="allCities" v-model="form.fields.cities" style="direction: rtl"></v-autocomplete>
      </v-flex>
      <v-flex class="xs4">
        <characters-input v-model="form.fields.characters"></characters-input>
        <!--<v-autocomplete multiple rtl flat placeholder="اشخاص" item-text="title"-->
        <!--item-value="id" chips :items="characters" v-model="form.fields.characters"></v-autocomplete>-->
      </v-flex>

    </v-layout>

    <h3 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">تاریخ شروع و پایان</h3>

    <!-- start DateTime -->
    <v-layout style="align-items: center;padding-right: 25px; " class="wrap">

      <v-flex class="xs2 offset-xs1">
        <v-menu ref="dateOccueMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.startDate" style="direction: rtl">
          <v-text-field slot="activator" label="تاریخ شروع" v-model="form.fields.startDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker locale="fa-Ar" type="date" v-model="form.fields.startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">انصراف</v-btn>
            <v-btn flat color="primary" @click="$refs.dateOccueMenu.save(form.fields.startDate)">تایید</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2">
        <v-menu ref="timeOccurMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.startTime" style="direction: rtl"
          @input="value => value && $refs.pickerS && ($refs.pickerS.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.startTime" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker style="z-index: 11" ref="pickerS" format="24hr" v-model="form.fields.startTime" @change="$refs.timeOccurMenu.save(form.fields.startTime)"></v-time-picker>
        </v-menu>
      </v-flex>


    </v-layout>
    <!-- end DateTime -->
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">

      <v-flex class="xs2 offset-xs1">
        <v-menu ref="dateMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.endDate" style="direction: rtl">
          <v-text-field slot="activator" label="تاریخ پایان" v-model="form.fields.endDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker locale="fa-Ar" type="date" v-model="form.fields.endDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">انصراف</v-btn>
            <v-btn flat color="primary" @click="$refs.dateMenu.save(form.fields.endDate)">تایید</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2">
        <v-menu ref="timeMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.endTime" style="direction: rtl"
          @input="value => value && $refs.pickerE && ($refs.pickerE.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.endTime" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="pickerE" format="24hr" v-model="form.fields.endTime" @change="$refs.timeMenu.save(form.fields.endTime)"></v-time-picker>
        </v-menu>
      </v-flex>


    </v-layout>

    <h3 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">تصاویر</h3>

    <v-layout>
      <images-sorter :images.sync="form.fields.sortedImages" class="xs3"></images-sorter>

      <images-uploader ref="imageUploader" v-model="form.fields.images" source="events" class="xs7"></images-uploader>
    </v-layout>

    <v-layout>
      <v-btn class="form__submit" @click="submitForm" color="primary" large :loading="form.submitButtonLoading" :disabled="submitButtonDisabled">تایید و ارسال
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
import EventTypeInput from '../../../components/Events/EventTypeInput'
// import PhotographersInput from '../../../components/Photographers/PhotographersInput'
import CharactersInput from '../../../components/Characters/CharactersInput'
// import AuthorsInput from '../../../components/Authors/AuthorsInput'
import ImagesUploader from '../../../components/ImagesUploader'
import ImagesSorter from '../../../components/ImagesSorter'
import PlaceInput from '../../../components/Places/PlaceInput'

export default {
  data: () => {
    return {
      allCities: [],
      // characters:[],
      form: {
        fields: {
          cities: [1],
          characters: [],
          subtitle: null,
          title: null,
          content: null,
          tags: [],
          // photographers: [],
          // authors: [],
          images: [],
          sortedImages: [],
          type_id: null,
          place_id: null,
          media: null,
          endTime: null,
          endDate: null,
          startTime: null,
          startDate: null,
          details: {
            address: {
              type: 'address',
              content: ''
            },
            tell: {
              type: 'tell',
              content: ''
            },
            price: {
              type: 'price',
              content: ''
            }
          },
          links: {
            website: {
              link: null
            }
          }
        },
        rules: {},
        submitButtonLoading: false,
        submitted: false,
        notSubmitted: false
      }
    }
  },
  methods: {
    initialForm() {
      this.$store.dispatch('IndexCities')
        .then(response => {
          let db_cities = response.data
          let local_cities = []
          db_cities.forEach(function(item) {
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
      // this.$store.dispatch('IndexCharacters')
      //   .then(response => {
      //     let result = response.data
      //     this.characters = result
      //   })
      let nowDate = new Date()
      this.form.fields.endDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
      this.form.fields.startDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
      this.form.fields.endTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
      this.form.fields.startTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
    }
  },
  components: {
    CharactersInput,
    TagInput,
    EventTypeInput,
    // PhotographersInput,
    // AuthorsInput,
    ImagesUploader,
    ImagesSorter,
    PlaceInput
  },
  watch: {
    'form.fields.images': function() {
      this.form.fields.sortedImages = this.form.fields.images
    }
  },
  methods: {
    submitForm() {
      let form = this.form.fields
      if (!form.details.tell.content) {
        delete form.details.tell
      }
      if (!form.details.price.content) {
        delete form.details.price
      }
      form.starts_at = this.form.fields.startDate + ' ' + this.form.fields.startTime
      this.form.fields.endTime
      form.ends_at = this.form.fields.endDate + ' ' + this.form.fields.endTime
      form.media = form.sortedImages
      this.form.submitButtonLoading = true
      this.$store.dispatch('createEventRequest', form)
        .then(response => {
          this.form.submitButtonLoading = false
          this.form.submitted = true
          setTimeout(() => {
            this.$router.push({
              name: 'EventsList'
            })
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
        title: null,
        content: null,
        tags: [],
        photographers: [],
        authors: [],
        images: [],
        sortedImages: [],
        type_id: null,
        place_id: null,
        media: null,
        links: {
          website: {
            link: null
          }
        }
      }
    },
    initialForm() {
      this.$store.dispatch('IndexCities')
        .then(response => {
          let db_cities = response.data
          let local_cities = []
          db_cities.forEach(function(item) {
            if (item.name === "مشهد" || item.name === "اهواز") {
              local_cities.push({
                'id': item.id,
                'name': item.name
              })
            }
          })
          this.allCities = local_cities
        })
        .catch(error => {
          this.$store.dispatch('handleError', error)
        })
      // this.$store.dispatch('IndexCharacters')
      //   .then(response => {
      //     let result = response.data
      //     this.characters = result
      //   })
      let nowDate = new Date()
      this.form.fields.endDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
      this.form.fields.startDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
      this.form.fields.endTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
      this.form.fields.startTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
    }
  },
  computed: {
    submitButtonDisabled() {
      let disabled = Boolean(this.form.fields.title &&
        this.form.fields.content &&
        // this.form.fields.photographers.length &&
        // this.form.fields.authors.length &&
        this.form.fields.images.length &&
        this.form.fields.type_id &&
        this.form.fields.endDate &&
        this.form.fields.endTime &&
        this.form.fields.startDate &&
        this.form.fields.startTime &&
        this.form.fields.details.address.content &&
        this.form.fields.cities.length)
      return !disabled
    }
  },
  mounted: function() {
    this.initialForm()
  }
}
</script>
<style lang="scss" scoped>
form {
    input,
    textarea {
        text-align: right;
        direction: rtl;
    }
    .form__submit {}
    .input-group {
        z-index: 20 !important;
    }
    .input-group.input-group--selection-controls.notify-switch {
        padding-right: 10px;
        padding-top: 20px;
        label {
            padding-right: 24px;
        }
    }
}
.v-menu__content {
    z-index: 50 !important;
}
</style>
