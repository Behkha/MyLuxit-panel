<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ویرایش نویسنده</h2>


    <form>

      <v-layout   class="wrap">
        <v-flex class="xs4 offset-xs1">
          <v-text-field label="نام" v-model="form.fields.name"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout >




        <v-dialog v-model="dialog" persistent width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" outline large color="red white-1 white--text">حذف نویسنده
            </v-btn>
          </template>
          <v-card>
            <v-card-title>تایید عملیات حذف</v-card-title>

            <v-card-text>آیا واقعا میخواهید این نویسنده را حذف کنید ؟</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="deleteAuthor($route.params.id) ">
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
  export default {
    data: () => {
      return {
        dialog: false,
        form: {
          fields: {
            name: null
          },
          rules: {},
          submitButtonLoading: false,
          submitted: false,
          notSubmitted: false
        }
      }
    },
    components: {},
    watch: {},
    methods: {
      submitForm () {
        let form = {
          name: this.form.fields.name,
          id: this.$route.params.id
        }
        this.form.submitButtonLoading = true
        this.$store.dispatch('editAuthorRequest', form)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'AuthorsList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      deleteAuthor (id) {
        this.$store.dispatch('deleteAuthorRequest', id)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'AuthorsList'})
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
          name: null
        }
      },
      initialForm () {
        this.$store.dispatch('showAuthor', this.$route.params.id)
          .then(response => {
            this.form.fields.name = response.data.name
            // this.initialForm()
          })

      }
    },
    computed: {
      submitButtonDisabled () {
        let disabled = Boolean(this.form.fields.name)
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
    .input-group.input-group--selection-controls.notify-switch {
      padding-right: 10px;
      padding-top: 20px;
      label {
        padding-right: 24px;
      }
    }
  }
</style>
