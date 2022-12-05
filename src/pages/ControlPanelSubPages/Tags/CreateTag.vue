<template>
  <v-container>
    <h2 style="text-align: right;margin-bottom: 25px;margin-top: 10px;">افزودن تگ جدید</h2>
    <form>

      <v-layout   class="wrap">
        <v-flex class="xs4 offset-xs1">
          <v-text-field label="نام" v-model="form.fields.name" ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout >
        <v-btn class="form__submit" @click="submitForm" color="primary" large :loading="form.submitButtonLoading"  :disabled="submitButtonDisabled">تایید و ارسال</v-btn>
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
        form: {
          fields: {
            name: null
          },
          rules: {
          },
          submitButtonLoading: false,
          submitted: false,
          notSubmitted: false
        }
      }
    },
    components: {
    },
    watch: {
    },
    methods: {
      submitForm () {
        let form = {
          name: this.form.fields.name
        }
        this.form.submitButtonLoading = true
        this.$store.dispatch('createTagRequest', form)
          .then(response => {
            this.form.submitButtonLoading = false
            this.form.submitted = true
            this.clearForm()
            setTimeout(() => {
              this.$router.push({name: 'TagsList'})
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
    input,textarea {
      text-align: right;
      direction: rtl;
    }
    .form__submit {
    }
    .input-group.input-group--selection-controls.notify-switch{
      padding-right: 10px;
      padding-top: 20px;
      label {
        padding-right: 24px;
      }
    }
  }
</style>
