<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container style="direction: rtl">
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ویرایش ادمین جدید</h2>

    <!--Names Inputs-->
    <v-layout>
      <v-flex xs5>
        <v-text-field dir="rtl" label="نام ادمین *" v-model="form.fields.name"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs5>
        <v-text-field dir="rtl" label="نام کاربری *" v-model="form.fields.username"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout>


      <v-dialog v-model="dialog" persistent width="500">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" outline large color="red white-1 white--text">حذف ادمین
          </v-btn>
        </template>
        <v-card>
          <v-card-title>تایید عملیات حذف</v-card-title>

          <v-card-text>آیا واقعا میخواهید این ادمین را حذف کنید ؟</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="deleteAdmin($route.params.id) ">
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
      <v-btn class="form__submit" @click="submit" outline color="warning white-1 white--text" large
             :loading="form.submitButtonLoading"
             :disabled="!isVerified">اعمال ویرایش
      </v-btn>
    </v-layout>

    <v-snackbar :timeout=5000 color="success" v-model="form.states.submittedSuccessfully" style="direction: rtl">
      درخواست با موفقیت ثبت شد.
      <v-btn flat @click.native="form.states.submittedSuccessfully = false">باشه</v-btn>
    </v-snackbar>
    <v-snackbar :timeout=5000 color="error" v-model="form.states.submittedFailed" style="direction: rtl">
      درخواست ثبت نشد.
      <v-btn flat @click.native="form.states.submittedFailed = false">باشه</v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
  export default {
    data: function () {
      return {
        dialog: false,
        form: {
          fields: {
            username: '',
            name: '',
          },
          states: {
            submittedSuccessfully: false,
            submittedFailed: false
          }
        }
      }
    },
    methods: {
      deleteAdmin () {
        this.$store.dispatch('deleteAdminRequest', this.$route.params.id)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            setTimeout(() => {
              this.$router.push({name: 'AdminsList'})
            }, 500)
          })
          .catch(error => {
            this.form.submitButtonLoading = false
            this.form.notSubmitted = true
            this.$store.dispatch('handleError', error)
          })
      },
      submit () {
        let data = this.form.fields
        data.id = this.$route.params.id
        this.$store.dispatch('editAdmin', data)
          .then(() => {
            this.form.states.submittedSuccessfully = true
            setTimeout(() => {
              this.$router.push({name: 'AdminsList'})
            }, 500)
          })
          .catch(error => {
            this.form.states.submittedFailed = true
            console.log(error)
          })
      },
      initialForm () {
        this.$store.dispatch('showAdmin', this.$route.params.id)
          .then(response => {
            this.form.fields.name = response.data.name
            this.form.fields.username = response.data.username
          })
          .catch(error => {
            this.$store.dispatch('handleError', error)
          })
      }
    },
    computed: {
      isVerified () {
        let isVerified = Boolean(this.form.fields.name && this.form.fields.username)
        return isVerified
      }

    },
    mounted () {
      this.initialForm()
    }
  }
</script>
<style>
  .error_CountLimit {

  }

  .error_Equality {

  }

  .error_CountLimit,
  .error_Equality {
    color: #fa5a68;
    margin: 5px 0 5px 0;
    font-size: 10px;
  }

  .invisible_error {
    display: none;
  }
</style>
