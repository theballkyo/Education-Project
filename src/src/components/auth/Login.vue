<template>
  <div class="login">
    <h2 v-if='error'>{{ error }}</h2>
    <form @submit.prevent="loginSubmit" v-if='!isLoginRequest'>
      <div class="field">
        <p class="control has-icon">
          <input class="input" name="email" type="email" placeholder="Email" v-model="email">
          <span class="icon is-small">
            <i class="fa fa-envelope"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icon">
          <input class="input" name="password" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small">
            <i class="fa fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" @click="loginSubmit">
            Login
          </button>
        </p>
      </div>
    </form>
    <div v-else>Login ...</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: 'faycarey@geekfarm.com',
      password: 'password'
    }
  },
  created () {
    this.checkLogin()
    this.$store.state.user.error = null
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      isLoginRequest: state => state.user.isLoginRequest,
      error: state => state.user.error
    })
  },
  watch: {
    isLoggedIn () {
      this.checkLogin()
    }
  },
  methods: {
    ...mapActions([
      'loginRequest'
    ]),
    loginSubmit () {
      this.loginRequest({email: this.email, password: this.password})
    },
    checkLogin () {
      if (this.isLoggedIn === true) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin: 20px auto;
  max-width: 300px;
}
</style>
