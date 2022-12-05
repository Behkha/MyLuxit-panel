<template>
<v-container>
  <h2 style="margin-bottom: 25px;margin-top: 10px;">افزودن پست جدید</h2>
  <form>
    <!-- Publish DateTime -->
    <v-layout style="" class="wrap">
      <v-flex class="xs2  offset-xs1">
        <v-menu ref="dateMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.publishDate" style="">
          <v-text-field slot="activator" label="تاریخ انتشار" v-model="form.fields.publishDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker locale="fa-Ar" type="date" v-model="form.fields.publishDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">انصراف</v-btn>
            <v-btn flat color="primary" @click="$refs.dateMenu.save(form.fields.publishDate)">تایید</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2">
        <v-menu ref="timeMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.publishTime" style=""
          @input="value => value && $refs.pickerP && ($refs.pickerP.selectingHour = true)">
          <v-text-field slot="activator" label="زمان انتشار" v-model="form.fields.publishTime" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="pickerP" format="24hr" v-model="form.fields.publishTime" @change="$refs.timeMenu.save(form.fields.publishTime)"></v-time-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <!-- occur DateTime -->
    <v-layout style="" class="wrap">
      <v-flex class="xs2 offset-xs1">
        <v-menu ref="dateOccueMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.occurDate" style="">
          <v-text-field slot="activator" label="تاریخ رخداد" v-model="form.fields.occurDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker locale="fa-Ar" type="date" v-model="form.fields.occurDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">انصراف</v-btn>
            <v-btn flat color="primary" @click="$refs.dateOccueMenu.save(form.fields.occurDate)">تایید</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2 ">
        <v-menu ref="timeOccurMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.occurTime" style=""
          @input="value => value && $refs.pickerO && ($refs.pickerO.selectingHour = true)">
          <v-text-field slot="activator" label="زمان رخداد" v-model="form.fields.occurTime" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="pickerO" format="24hr" v-model="form.fields.occurTime" @change="$refs.timeOccurMenu.save(form.fields.occurTime)"></v-time-picker>
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
        <place-input v-model="form.fields.postable_id" v-if="form.fields.postable_type === 'place'"></place-input>
        <event-input v-model="form.fields.postable_id" v-else-if="form.fields.postable_type === 'event'"></event-input>
      </v-flex>
    </v-layout>
    <v-layout class="wrap">
      <v-flex xs4>
        <tag-input v-model="form.fields.tags"></tag-input>
      </v-flex>
    </v-layout>
    <v-layout class="wrap">
      <v-flex class="xs4 offset-xs2">
        <v-text-field label="عنوان فرعی" v-model="form.fields.subtitle"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout class="wrap">
      <v-flex class="xs4 offset-xs2">
        <v-autocomplete multiple rtl flat label="شهر" item-text="name" item-value="id" chips :items="allCities" v-model="form.fields.cities" style=""></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-btn class="form__submit ma-0" @click="submitForm" color="primary" large :loading="form.submitButtonLoading" :disabled="submitButtonDisabled">تایید و ارسال
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
      form: {
        fields: {
          cities: [1],
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
  watch: {
    'form.fields.postable_type': function() {
      this.form.fields.postable_id = null
    }
  },
  methods: {
    submitForm() {
      let form = this.form.fields
      form.occur_at = this.form.fields.occurDate + ' ' + this.form.fields.occurTime
      form.publish_at = this.form.fields.publishDate + ' ' + this.form.fields.publishTime
      this.form.submitButtonLoading = true
      this.$store.dispatch('createPostRequest', form)
        .then(response => {
          this.form.submitButtonLoading = false
          this.form.submitted = true
          setTimeout(() => {
            this.$router.push({
              name: 'PostsList'
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
      let nowDate = new Date()
      this.form.fields.publishDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
      this.form.fields.occurDate = nowDate.getFullYear() + '-' + ('0' + (parseInt(nowDate.getMonth()) + 1)).slice(-2) + '-' + ('0' + nowDate.getDate()).slice(-2)
      this.form.fields.publishTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
      this.form.fields.occurTime = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
    }
  },
  computed: {
    submitButtonDisabled() {
      let disabled = Boolean(
        this.form.fields.publishDate &&
        this.form.fields.publishTime &&
        this.form.fields.occurDate &&
        this.form.fields.occurTime &&
        this.form.fields.subtitle &&
        this.form.fields.postable_id)
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
    }
    .form__submit {}
    .input-group.input-group--selection-controls.notify-switch {
        padding-right: 10px;
        padding-top: 20px;
        label {
            padding-right: 24px;
        }
    }
}
</style>
