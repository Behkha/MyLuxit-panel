<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ویرایش شخص</h2>


    <form>

      <!-- Title Input + Place Type Input -->
      <v-layout   class="wrap">
        <v-flex class="xs4 offset-xs2">
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
        <images-uploader ref="imageUploader" :initial-items="initialImages" v-model="form.fields.images" source="celebrities"
                         class="xs7"></images-uploader>

      </v-layout>


      <v-layout >

        <v-dialog v-model="dialog" persistent width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" outline large color="red white-1 white--text">حذف شخص
            </v-btn>
          </template>
          <v-card>
            <v-card-title>تایید عملیات حذف</v-card-title>

            <v-card-text>آیا واقعا میخواهید این شخص را حذف کنید ؟</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="deleteCharacter($route.params.id) ">
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
        id: '',
        dialog: false,
        initialImages: [],
        character_types: '',
        form: {
          fields: {
            type_id: '',
            bio: null,
            title: null,
            images: [],
            types: [],
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
        let data = {
          'form': form,
          'id': this.$route.params.id
        }
        this.$store.dispatch('editCelebritiesRequest', data)
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
          types: [],
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
            this.$store.dispatch('showCharacter', this.$route.params.id)
              .then(response => {
                let result = response.data
                this.id = result.id
                this.initialImages = result.media
                this.form.fields = {
                  bio: result.bio,
                  title: result.name,
                  images: [],
                  sortedImages: [],
                  media: null,
                  contact: result.contact
                }
                let character_temp = []
                result.character.types.forEach(function (item) {
                  character_temp.push(item.id)
                })
                this.form.fields.types = character_temp
              })
          })
      },
      deleteCharacter (id) {
        this.$store.dispatch('deleteCharacterRequest', id)
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
