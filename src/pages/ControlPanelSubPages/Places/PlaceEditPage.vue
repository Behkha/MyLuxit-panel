<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<v-container>
  <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ویرایش مکان</h2>


  <form>

    <!-- Name Input + Place Type Input -->
    <v-layout class="wrap">


      <v-flex class="xs4 offset-xs2">
        <v-text-field label="نام" v-model="form.fields.name"></v-text-field>
      </v-flex>
      <!-- <v-flex class="xs4">
        <place-type-input v-model="form.fields.type_id"></place-type-input>
      </v-flex> -->
    </v-layout>

    <!-- Content Input -->
    <v-layout class="wrap">
      <v-flex class="xs10">
        <v-textarea outline type="text" placeholder="محتوا" v-model="form.fields.content" style="direction: rtl"></v-textarea>
      </v-flex>
    </v-layout>

    <!-- Address Input -->
    <v-layout class="wrap">
      <v-flex class="xs10">
        <v-text-field label="آدرس" v-model="form.fields.address" style="direction: rtl"></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Location Input -->
    <!-- <v-layout class="wrap">

      <v-flex class="xs4  offset-xs2">
        <v-text-field label="طول جغرافیایی" v-model="form.fields.locationX" hint="اولی از راست"></v-text-field>
      </v-flex>
      <v-flex class="xs4">
        <v-text-field label="عرض جغرافیایی" v-model="form.fields.locationY" hint="دومی از راست"></v-text-field>
      </v-flex>
    </v-layout> -->

    <!-- Tag input + link input -->
    <v-layout class="wrap">

      <v-flex class="xs4  offset-xs2">
        <tag-input :initial-items="initialTags" v-model="form.fields.tags"></tag-input>
      </v-flex>
      <v-flex class="xs4">
        <v-text-field label="لینک وبسایت" v-model="form.fields.links.website.link"></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Authors input + Photographers input -->
    <v-layout class="wrap">


      <!-- <v-flex class="xs4  offset-xs2">
        <authors-input :initial-items="initialAuthors" v-model="form.fields.authors"></authors-input>
      </v-flex>
      <v-flex class="xs4">
        <photographers-input :initial-items="initialPhotographers" v-model="form.fields.photographers"></photographers-input>
      </v-flex> -->
    </v-layout>

    <v-layout class="wrap">

      <v-flex class="xs4 offset-xs2">
        <v-text-field type="number" label="تلفن" v-model="form.fields.details.tell.content"></v-text-field>
      </v-flex>
      <v-flex class="xs4">
        <v-text-field label="عنوان فرعی" v-model="form.fields.subtitle"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout class="wrap">
      <v-flex class="xs4">
        <v-autocomplete multiple rtl flat label="شهر" item-text="name" item-value="id" chips :items="allCities" v-model="form.fields.cities" style="direction: rtl"></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-flex class="xs4 offset-xs2">
      <v-text-field type="number" label="قیمت" v-model="form.fields.price"></v-text-field>
    </v-flex>
    <!-- <h3 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ساعت کاری</h3> -->

    <!-- start DateTime -->
    <!-- <v-layout style="align-items: center;padding-right: 25px;" class="wrap">
      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="شنبه" v-model="form.fields.saturday_active"></v-checkbox>
      </v-flex>
      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time0Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px"
          :return-value.sync="form.fields.details.schedule.week_days.saturday[0].start" style="direction: rtl" @input="value => value && $refs.picker0s && ($refs.picker0s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.saturday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker0s" format="24hr" v-model="form.fields.details.schedule.week_days.saturday[0].start" @change="$refs.time0Start.save(form.fields.details.schedule.week_days.saturday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2 ">
        <v-menu ref="time0End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.saturday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker0e && ($refs.picker0e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.saturday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker0e" format="24hr" v-model="form.fields.details.schedule.week_days.saturday[0].end" @change="$refs.time0End.save(form.fields.details.schedule.week_days.saturday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>


    </v-layout>
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">

      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="یکشنبه" v-model="form.fields.sunday_active"></v-checkbox>
      </v-flex>


      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time1Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.sunday[0].start"
          style="direction: rtl" @input="value => value && $refs.picker1s && ($refs.picker1s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.sunday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker1s" format="24hr" v-model="form.fields.details.schedule.week_days.sunday[0].start" @change="$refs.time1Start.save(form.fields.details.schedule.week_days.sunday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>

      <v-flex class="xs2">
        <v-menu ref="time1End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.sunday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker1e && ($refs.picker1e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.sunday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker1e" format="24hr" v-model="form.fields.details.schedule.week_days.sunday[0].end" @change="$refs.time1End.save(form.fields.details.schedule.week_days.sunday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>

    </v-layout>
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">

      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="دوشنبه" v-model="form.fields.monday_active"></v-checkbox>
      </v-flex>

      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time2Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.monday[0].start"
          style="direction: rtl" @input="value => value && $refs.picker2s && ($refs.picker2s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.monday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker2s" format="24hr" v-model="form.fields.details.schedule.week_days.monday[0].start" @change="$refs.time2Start.save(form.fields.details.schedule.week_days.monday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2 ">
        <v-menu ref="time2End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.monday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker2e && ($refs.picker2e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.monday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker2e" format="24hr" v-model="form.fields.details.schedule.week_days.monday[0].end" @change="$refs.time2End.save(form.fields.details.schedule.week_days.monday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>


    </v-layout>
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">
      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="سه شنبه" v-model="form.fields.tuesday_active"></v-checkbox>
      </v-flex>


      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time3Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.tuesday[0].start"
          style="direction: rtl" @input="value => value && $refs.picker3s && ($refs.picker3s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.tuesday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker3s" format="24hr" v-model="form.fields.details.schedule.week_days.tuesday[0].start" @change="$refs.time3Start.save(form.fields.details.schedule.week_days.tuesday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>
      <v-flex class="xs2 ">
        <v-menu ref="time3End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.tuesday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker3e && ($refs.picker3e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.tuesday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker3e" format="24hr" v-model="form.fields.details.schedule.week_days.tuesday[0].end" @change="$refs.time3End.save(form.fields.details.schedule.week_days.tuesday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>


    </v-layout>
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">
      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="چهارشنبه" v-model="form.fields.wednesday_active"></v-checkbox>
      </v-flex>


      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time4Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px"
          :return-value.sync="form.fields.details.schedule.week_days.wednesday[0].start" style="direction: rtl" @input="value => value && $refs.picker4s && ($refs.picker4s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.wednesday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker4s" format="24hr" v-model="form.fields.details.schedule.week_days.wednesday[0].start" @change="$refs.time4Start.save(form.fields.details.schedule.week_days.wednesday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>

      <v-flex class="xs2 ">
        <v-menu ref="time4End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.wednesday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker4e && ($refs.picker4e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.wednesday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker4e" format="24hr" v-model="form.fields.details.schedule.week_days.wednesday[0].end" @change="$refs.time4End.save(form.fields.details.schedule.week_days.wednesday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>

    </v-layout>
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">
      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="پنجشنبه" v-model="form.fields.thursday_active"></v-checkbox>
      </v-flex>


      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time5Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px"
          :return-value.sync="form.fields.details.schedule.week_days.thursday[0].start" style="direction: rtl" @input="value => value && $refs.picker5s && ($refs.picker5s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.thursday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker5s" format="24hr" v-model="form.fields.details.schedule.week_days.thursday[0].start" @change="$refs.time5Start.save(form.fields.details.schedule.week_days.thursday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>

      <v-flex class="xs2 ">
        <v-menu ref="time5End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.thursday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker5e && ($refs.picker5e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.thursday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker5e" format="24hr" v-model="form.fields.details.schedule.week_days.thursday[0].end" @change="$refs.time5End.save(form.fields.details.schedule.week_days.thursday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>

    </v-layout>
    <v-layout style="align-items: center;padding-right: 25px;" class="wrap">
      <v-flex class="xs1  offset-xs1" style="text-align: right">
        <v-checkbox label="جمعه" v-model="form.fields.friday_active"></v-checkbox>
      </v-flex>


      <v-flex class="xs2  offset-xs1">
        <v-menu ref="time6Start" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.friday[0].start"
          style="direction: rtl" @input="value => value && $refs.picker6s && ($refs.picker6s.selectingHour = true)">
          <v-text-field slot="activator" label="زمان شروع" v-model="form.fields.details.schedule.week_days.friday[0].start" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker6s" format="24hr" v-model="form.fields.details.schedule.week_days.friday[0].start" @change="$refs.time6Start.save(form.fields.details.schedule.week_days.friday[0].start)"></v-time-picker>
        </v-menu>
      </v-flex>

      <v-flex class="xs2 ">
        <v-menu ref="time6End" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="form.fields.details.schedule.week_days.friday[0].end"
          style="direction: rtl" @input="value => value && $refs.picker6e && ($refs.picker6e.selectingHour = true)">
          <v-text-field slot="activator" label="زمان پایان" v-model="form.fields.details.schedule.week_days.friday[0].end" prepend-icon="access_time" readonly></v-text-field>
          <v-time-picker ref="picker6e" format="24hr" v-model="form.fields.details.schedule.week_days.friday[0].end" @change="$refs.time6End.save(form.fields.details.schedule.week_days.friday[0].end)"></v-time-picker>
        </v-menu>
      </v-flex>

    </v-layout> -->


    <h3 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">تصاویر</h3>

    <v-layout>
      <images-sorter :images.sync="form.fields.sortedImages" class="xs3"></images-sorter>
      <images-uploader ref="imageUploader" :initial-items="initialImages" v-model="form.fields.images" source="places" class="xs7"></images-uploader>

    </v-layout>

    <v-layout>


      <v-dialog v-model="dialog" persistent width="500">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" outline large color="red white-1 white--text">حذف مکان
          </v-btn>
        </template>
        <v-card>
          <v-card-title>تایید عملیات حذف</v-card-title>

          <v-card-text>آیا واقعا میخواهید این مکان را حذف کنید ؟</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="deletePlace($route.params.id) ">
              بله
            </v-btn>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">
              خیر
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="form__submit" @click="submitForm" outline color="warning white-1 white--text" large :loading="form.submitButtonLoading" :disabled="submitButtonDisabled">اعمال ویرایش
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
import PlaceTypeInput from '../../../components/Places/PlaceTypeInput'
import PhotographersInput from '../../../components/Photographers/PhotographersInput'
import AuthorsInput from '../../../components/Authors/AuthorsInput'
import ImagesUploader from '../../../components/ImagesUploader'
import ImagesSorter from '../../../components/ImagesSorter'

export default {
  data: () => {
    return {
      allCities: [],
      initialTags: [],
      initialImages: [],
      initialPhotographers: [],
      initialAuthors: [],
      dialog: false,
      form: {
        fields: {
          price: '',
          cities: [],
          saturday_active: false,
          sunday_active: false,
          monday_active: false,
          tuesday_active: false,
          wednesday_active: false,
          thursday_active: false,
          friday_active: false,
          subtitle: null,
          name: null,
          content: null,
          address: null,
          locationX: null,
          locationY: null,
          tags: [],
          photographers: [],
          authors: [],
          images: [],
          sortedImages: [],
          city_id: 1,
          // type_id: null,
          media: null,
          details: {
            tell: {
              type: 'tell',
              content: ''
            },
            schedule: {
              type: 'schedule',
              week_days: {
                saturday: [{
                  start: '',
                  end: ''
                }],
                sunday: [{
                  start: '',
                  end: ''
                }],
                monday: [{
                  start: '',
                  end: ''
                }],
                tuesday: [{
                  start: '',
                  end: ''
                }],
                wednesday: [{
                  start: '',
                  end: ''
                }],
                thursday: [{
                  start: '',
                  end: ''
                }],
                friday: [{
                  start: '',
                  end: ''
                }]
              }
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
  components: {
    TagInput,
    PlaceTypeInput,
    PhotographersInput,
    AuthorsInput,
    ImagesUploader,
    ImagesSorter
  },
  watch: {
    'form.fields.images': function() {
      this.form.fields.sortedImages = this.form.fields.images
    }
  },
  methods: {
    deletePlace(id) {
      this.$store.dispatch('deletePlaceRequest', id)
        .then(response => {
          this.form.submitButtonLoading = false
          this.form.submitted = true
          this.clearForm()
          setTimeout(() => {
            this.$router.push({
              name: 'PlacesList'
            })
          }, 500)
        })
        .catch(error => {
          if (error.status == undefined) {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({
                name: 'PlacesList'
              })
            }, 500)
          } else {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          }
        })
    },
    submitForm() {

      let chosen_days = {}
      let all_days = this.form.fields.details.schedule.week_days

      // if (this.form.fields.saturday_active) {
      //   chosen_days.saturday = []
      //   all_days.saturday.forEach(function (item) {
      //     chosen_days.saturday.push(item)
      //   })
      //   // chosen_days.saturday = [{
      //   //   start: all_days.saturday[0].start,
      //   //   end: all_days.saturday[0].end
      //   // }]
      // }

      if (this.form.fields.saturday_active) {
        chosen_days.saturday = [{
          start: all_days.saturday[0].start,
          end: all_days.saturday[0].end
        }]
      }
      if (this.form.fields.sunday_active) {
        chosen_days.sunday = [{
          start: all_days.sunday[0].start,
          end: all_days.sunday[0].end,
        }]
      }
      if (this.form.fields.monday_active) {
        chosen_days.monday = [{
          start: all_days.monday[0].start,
          end: all_days.monday[0].end,
        }]
      }
      if (this.form.fields.tuesday_active) {
        chosen_days.tuesday = [{
          start: all_days.tuesday[0].start,
          end: all_days.tuesday[0].end,
        }]
      }
      if (this.form.fields.wednesday_active) {
        chosen_days.wednesday = [{
          start: all_days.wednesday[0].start,
          end: all_days.wednesday[0].end,
        }]
      }
      if (this.form.fields.thursday_active) {
        chosen_days.thursday = [{
          start: all_days.thursday[0].start,
          end: all_days.thursday[0].end,
        }]
      }
      if (this.form.fields.friday_active) {
        chosen_days.friday = [{
          start: all_days.friday[0].start,
          end: all_days.friday[0].end,
        }]
      }

      // this.form.fields.details.schedule.week_days = chosen_days
      if (!this.form.fields.details.tell.content) {
        this.form.fields.details = {
          schedule: {
            type: 'schedule',
            week_days: this.form.fields.details.schedule.week_days
          }
        }
      }

      let form = this.form.fields
      form.details.schedule.week_days = chosen_days


      if (!(this.form.fields.saturday_active || this.form.fields.sunday_active || this.form.fields.monday_active || this.form.fields.tuesday_active || this.form.fields.wednesday_active || this.form.fields.thursday_active || this.form.fields
          .friday_active)) {
        form.details = {
          tell: {
            type: 'tell',
            content: this.form.fields.details.tell.content
          }
        }
      }

      form.media = form.sortedImages
      if (form.locationY && form.locationX) {
        form.location = form.locationY + ',' + form.locationX
      }
      this.form.submitButtonLoading = true
      let data = {
        'id': this.$route.params.id,
        'form': form
      }
      this.$store.dispatch('editPlaceRequest', data)
        .then(response => {
          this.form.submitButtonLoading = false
          this.form.submitted = true
          setTimeout(() => {
            this.$router.push({
              name: 'PlacesList'
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
      // this.form.fields = {
      //   name: null,
      //   content: null,
      //   address: null,
      //   locationX: null,
      //   locationY: null,
      //   tags: [],
      //   photographers: [],
      //   authors: [],
      //   images: [],
      //   sortedImages: [],
      //   city_id: 1,
      //   type_id: null,
      //   media: null,
      //   links: {
      //     website: {
      //       link: null
      //     }
      //   }
      // }
    },
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
      this.$store.dispatch('showPlace', this.$route.params.id)
        .then(response => {
          let result = response.data
          this.form.fields.subtitle = result.subtitle
          this.form.fields.name = result.name
          this.form.fields.content = result.content
          // this.form.fields.type_id = result.type.id
          this.form.fields.cities = []
          this.form.fields.address = result.address
          this.form.fields.price = result.price
          // this.form.fields.links = result.links
          this.form.fields.links = {
            website: {
              link: null
            }
          }
          let response_cities_array = []
          result.cities.forEach(function(item) {
            response_cities_array.push(item.id)
          })
          this.form.fields.cities = response_cities_array
          let linksSw = Boolean(result.links)
          if (linksSw) {
            let websiteSw = Boolean(result.links.website)
            if (websiteSw) {
              let linkSw = Boolean(result.links.website.link)
              if (linkSw) {
                this.form.fields.links = {
                  website: {
                    link: result.links.website.link
                  }
                }
              }
            }
          }
          // this.form.fields.tags = result.tags
          this.form.fields.tags = []
          this.initialTags = result.tags

          // this.form.fields.tags = result.tags
          this.form.fields.authors = []
          this.initialAuthors = result.authors

          // this.form.fields.photographers = result.photographers
          this.form.fields.photographers = []
          this.initialPhotographers = result.photographers

          this.form.fields.city_id = result.city.id

          this.form.fields.images = []
          // this.form.fields.images = result.media
          this.form.fields.sortedImages = []
          // this.form.fields.sortedImages = result.media
          this.form.fields.media = []
          // this.form.fields.media = result.media
          this.initialImages = result.media

          this.form.fields.details = {
            tell: {
              type: 'tell',
              content: ''
            },
            schedule: {
              type: 'schedule',
              week_days: {
                saturday: [{
                  start: '',
                  end: ''
                }],
                sunday: [{
                  start: '',
                  end: ''
                }],
                monday: [{
                  start: '',
                  end: ''
                }],
                tuesday: [{
                  start: '',
                  end: ''
                }],
                wednesday: [{
                  start: '',
                  end: ''
                }],
                thursday: [{
                  start: '',
                  end: ''
                }],
                friday: [{
                  start: '',
                  end: ''
                }]
              }
            }
          }

          if (Boolean(result.details.tell.content)) {
            this.form.fields.details.tell.content = result.details.tell.content
          }
          let nowDate = new Date()

          if (Boolean(result.details.schedule)) {
            if (Boolean(result.details.schedule.week_days.en.saturday)) {
              this.form.fields.saturday_active = true
              this.form.fields.details.schedule.week_days.saturday[0].start = result.details.schedule.week_days.en.saturday[0].start
              this.form.fields.details.schedule.week_days.saturday[0].end = result.details.schedule.week_days.en.saturday[0].end
            } else {
              this.form.fields.details.schedule.week_days.saturday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.saturday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
            if (Boolean(result.details.schedule.week_days.en.sunday)) {
              this.form.fields.sunday_active = true
              this.form.fields.details.schedule.week_days.sunday[0].start = result.details.schedule.week_days.en.sunday[0].start
              this.form.fields.details.schedule.week_days.sunday[0].end = result.details.schedule.week_days.en.sunday[0].end
            } else {
              this.form.fields.details.schedule.week_days.sunday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.sunday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
            if (Boolean(result.details.schedule.week_days.en.monday)) {
              this.form.fields.monday_active = true
              this.form.fields.details.schedule.week_days.monday[0].start = result.details.schedule.week_days.en.monday[0].start
              this.form.fields.details.schedule.week_days.monday[0].end = result.details.schedule.week_days.en.monday[0].end
            } else {
              this.form.fields.details.schedule.week_days.monday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.monday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
            if (Boolean(result.details.schedule.week_days.en.tuesday)) {
              this.form.fields.tuesday_active = true
              this.form.fields.details.schedule.week_days.tuesday[0].start = result.details.schedule.week_days.en.tuesday[0].start
              this.form.fields.details.schedule.week_days.tuesday[0].end = result.details.schedule.week_days.en.tuesday[0].end
            } else {
              this.form.fields.details.schedule.week_days.tuesday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.tuesday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
            if (Boolean(result.details.schedule.week_days.en.wednesday)) {
              this.form.fields.wednesday_active = true
              this.form.fields.details.schedule.week_days.wednesday[0].start = result.details.schedule.week_days.en.wednesday[0].start
              this.form.fields.details.schedule.week_days.wednesday[0].end = result.details.schedule.week_days.en.wednesday[0].end
            } else {
              this.form.fields.details.schedule.week_days.wednesday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.wednesday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
            if (Boolean(result.details.schedule.week_days.en.thursday)) {
              this.form.fields.thursday_active = true
              this.form.fields.details.schedule.week_days.thursday[0].start = result.details.schedule.week_days.en.thursday[0].start
              this.form.fields.details.schedule.week_days.thursday[0].end = result.details.schedule.week_days.en.thursday[0].end
            } else {
              this.form.fields.details.schedule.week_days.thursday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.thursday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
            if (Boolean(result.details.schedule.week_days.en.friday)) {
              this.form.fields.friday_active = true
              this.form.fields.details.schedule.week_days.friday[0].start = result.details.schedule.week_days.en.friday[0].start
              this.form.fields.details.schedule.week_days.friday[0].end = result.details.schedule.week_days.en.friday[0].end
            } else {
              this.form.fields.details.schedule.week_days.friday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
              this.form.fields.details.schedule.week_days.friday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            }
          } else {
            this.form.fields.details.schedule.week_days.friday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.friday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.thursday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.thursday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.wednesday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.wednesday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.tuesday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.tuesday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.saturday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.saturday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.sunday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.sunday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.monday[0].end = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
            this.form.fields.details.schedule.week_days.monday[0].start = ('0' + nowDate.getHours()).slice(-2) + ':' + ('0' + nowDate.getMinutes()).slice(-2)
          }

        })

    }
  },
  computed: {
    submitButtonDisabled() {
      let disabled = Boolean(this.form.fields.name &&
        this.form.fields.content &&
        this.form.fields.address &&
        this.form.fields.images.length &&
        // this.form.fields.type_id &&
        this.form.fields.subtitle &&
        this.form.fields.cities.length && this.form.fields.price)
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
</style>
