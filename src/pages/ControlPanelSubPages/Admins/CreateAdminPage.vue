<template>
  <v-container style="direction: rtl">
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">ساخت ادمین جدید</h2>

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
      <v-flex xs5>
        <v-text-field dir="rtl" label="رمز عبور *" :type="'password'" v-model="form.fields.password"></v-text-field>
        <p class="error_CountLimit" v-if="errCountLimit">پسوورد باید حداقل شامل 6 کاراکتر باشد.</p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs5>
        <v-text-field dir="rtl" label="تایید رمز عبور *" :type="'password'" v-model="form.fields.password_confirmation"></v-text-field>
        <p class="error_Equality" v-if="errEquality">متن با پسوورد وارد شده برابر نیست.</p>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-btn class="form__submit" @click="submit" color="primary" large :loading="form.submitButtonLoading"
             :disabled="!isVerified">ساخت ادمین
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
        form: {
          fields: {
            username: '',
            name: '',
            password: '',
            password_confirmation: ''
          },
          states: {
            submittedSuccessfully: false,
            submittedFailed: false
          }
        }
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('CreateAdmin', this.form.fields)
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
      }
    },
    computed: {
      isVerified () {
        let isVerified = Boolean((this.form.fields.password_confirmation === this.form.fields.password) && (this.form.fields.name && this.form.fields.username && this.form.fields.password && this.form.fields.password_confirmation))
        return isVerified
      },
      errCountLimit () {
        let errCountLimit = true
        if (this.form.fields.password.length > 5 || this.form.fields.password.length === 0) {
          errCountLimit = false
        }
        return errCountLimit
      },
      errEquality () {
        let errEquality = false
        if (this.form.fields.password.length > 5) {
          if (!(this.form.fields.password === this.form.fields.password_confirmation)) {
            errEquality = true
          }
        }
        return errEquality
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


