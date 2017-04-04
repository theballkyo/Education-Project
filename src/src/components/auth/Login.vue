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
    <div v-else class="has-text-centered">
      กำลังทำการ Login ...
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/Loading.vue'
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
    ...mapState('user', {
      isLoggedIn: state => state.isLoggedIn,
      isLoginRequest: state => state.isLoginRequest,
      error: state => state.error
    })
  },
  watch: {
    isLoggedIn () {
      this.checkLogin()
    }
  },
  methods: {
    ...mapActions('user', [
      'loginRequest'
    ]),
    loginSubmit () {
      this.error = null
      this.loginRequest({email: this.email, password: this.password})
    },
    checkLogin () {
      if (this.isLoggedIn === true) {
        this.$router.push('/')
      }
    }
  },
  components: {
    Loading
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
