<template>
  <div class="login">
    <h2 v-if='error'>{{ error }}</h2>
    <form @submit.prevent="loginSubmit" v-if='!isLoginRequest'>
      <input v-model="email" type="text" name="email"></input>
      <input v-model="password" type="password" name="password"></input>
      <button>Login</button>
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
      email: 'test@test.com',
      password: '1234'
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
        this.$router.push('/course')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
