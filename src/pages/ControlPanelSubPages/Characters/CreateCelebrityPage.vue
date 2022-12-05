<template>
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">سلبریتی جدید</h2>


    <form>

      <!-- Title Input + Place Type Input -->
      <v-layout   class="wrap">
        <v-flex class="xs4  offset-xs2">
          <v-autocomplete multiple rtl flat placeholder="نوع شخص" item-text="title"
                    item-value="id" chips :items="character_types" v-model="form.fields.types"></v-autocomplete>
        </v-flex>

        <v-flex class="xs4">
          <v-text-field label="عنوان" v-model="form.fields.title"></v-text-field>
        </v-flex>
      </v-layout>

      <!-- Content Input -->
      <v-layout   class="wrap">
        <v-flex class="xs10">
          <v-textarea outline type="text" placeholder="بیوگرافی" v-model="form.fields.bio"
                        style="direction: rtl"></v-textarea>
        </v-flex>
      </v-layout>


      <!--price + tell-->
      <v-layout   class="wrap">
        <v-flex class="xs4  offset-xs2">
          <v-text-field type="email" label="ایمیل" v-model="form.fields.contact.email.content"></v-text-field>
        </v-flex>
        <v-flex class="xs4">
          <v-text-field type="number" label="شماره تلفن" v-model="form.fields.contact.tell.content"></v-text-field>
        </v-flex>
      </v-layout>


      <h3 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">تصاویر</h3>

      <v-layout >
        <images-sorter :images.sync="form.fields.sortedImages" class="xs3"></images-sorter>
        <images-uploader ref="imageUploader" v-model="form.fields.images" source="celebrities" class="xs7"></images-uploader>
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
  import EventTypeInput from '../../../components/Events/EventTypeInput'
  import PhotographersInput from '../../../components/Photographers/PhotographersInput'
  import AuthorsInput from '../../../components/Authors/AuthorsInput'
  import ImagesUploader from '../../../components/ImagesUploader'
  import ImagesSorter from '../../../components/ImagesSorter'
  import PlaceInput from '../../../components/Places/PlaceInput'

  export default {
    data: () => {
      return {
        character_types: [],
        form: {
          fields: {
            type_id: '',
            bio: null,
            types: [],
            title: null,
            images: [],
            sortedImages: [],
            media: null,
            contact: {
              tell: {
                title: 'شماره تلفن',
                type: 'tell',
                content: ''
              },
              email: {
                title: 'ایمیل',
                type: 'email',
                content: ''
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
      ImagesUploader,
      ImagesSorter
    },
    watch: {
      'form.fields.images': function () {
        this.form.fields.sortedImages = this.form.fields.images
      }
    },
    methods: {
      submitForm () {
        let form = this.form.fields
        form.media = form.sortedImages
        this.form.submitButtonLoading = true
        this.$store.dispatch('createCelebritiesRequest', form)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'CharactersList'})
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
          bio: null,
          title: null,
          images: [],
          sortedImages: [],
          media: null,
          contact: {
            tell: {
              title: 'شماره تلفن',
              type: 'tell',
              content: ''
            },
            email: {
              title: 'ایمیل',
              type: 'email',
              content: ''
            }
          }
        }
      },
      initialForm () {
        this.$store.dispatch('showCharacterTypes')
          .then(response => {
            let result = response.data
            this.character_types = result
          })
      }
    },
    computed: {
      submitButtonDisabled () {
        let disabled = Boolean(this.form.fields.title &&
          this.form.fields.title &&
          this.form.fields.bio &&
          this.form.fields.images.length &&
          this.form.fields.types.length &&
          this.form.fields.contact.tell.content &&
          this.form.fields.contact.email.content)
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
      text-align: right;
      direction: rtl;
    }
    .form__submit {
    }
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
