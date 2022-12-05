<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6 mx-auto >
        <div class="loginBox">
          <img width="150px" src="../assets/Logo.png"/>
          <v-form v-model="valid" >
            <v-text-field label="نام کاربری" ref="form" v-model="username" :rules="usernameRules"  @keyup.enter="submit" required></v-text-field>
            <v-text-field rtl label="رمز عبور" v-model="password" :rules="passwordRules" type="password"  @keyup.enter="submit" required></v-text-field>
            <v-btn @click.prevent="submit" :loading="isPending" :disabled="!valid" color="light-green" class="mx-auto my-0 white--text submit__btn">ورود</v-btn>
            <p class="loginBox__error" v-if="error">اطلاعات ورود شما صحیح نمی باشد.</p>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
  .loginBox{
    margin: 100px auto;
    width: 400px;
    background: #676767;
    padding: 25px 25px 30px;
    border-radius: 5px;
    box-shadow: #212121 1px 3px 2px;
    .submit__btn{
      position: relative;
      top: 10px;
      /*right: 5px;*/
    }
    p.loginBox__error{
      position: relative;
      color: red;
      text-align: center;
      top: 30px;
      direction: rtl;
    }
    img{
      display: block;
      margin: 0 auto;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        username: null,
        password: null,
        usernameRules: [
          v => !!v || 'نام کاربری الزامی است .'
        ],
        passwordRules: [
          v => !!v || 'رمزورود الزامی است',
          v => (v && v.length >= 6) || 'رمز ورود حداقل ۶ کاراکتر باید باشد'
        ],
        valid: true,
        error: false
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('login', {username: this.username, password: this.password})
            .then(() => {
              if (this.$store.getters.isLoggedIn) {
                this.$router.push({name: 'Panel'})
                this.error = false
              } else {
                this.error = true
              }
            })
        }
      }
    },
    computed: {
      isPending () {
        return this.$store.getters.isPending
      }
    }
  }
</script>
