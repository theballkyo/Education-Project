<template>
<nav class="nav has-shadow">
  <div class="nav-left">
    <a @click="logoClick" class="nav-item" href="#"><img src="https://dummyimage.com/640x160/252525/fff" alt="Bulma logo"></a>
  </div>

  <label for="menu-toggle" class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </label>
  <input type="checkbox" id="menu-toggle" class="is-hidden"/>

  <div class="nav-right nav-menu">
    <div class="nav-item">
      <p class="control">
        <input class="input" type="text" v-model="subject" placeholder="Search a courses">
      </p>
      <button @click="searchClick" class="button">
        <span class="icon is-small">
          <i class="fa fa-search"></i>
        </span>
      </button>
    </div>

    <span v-if="isLoggedIn" class="welcome nav-item">Welcome {{ fullname }}</span>

    <span class="nav-item" v-if="canManage === true">
      <router-link to="/backend" class="button is-primary">
        <span class="icon">
          <i class="fa fa-sign-in"></i>
        </span>
        <span>หน้าจัดการ</span>
      </router-link>
    </span>

    <span class="nav-item">
      <router-link to="/login" class="button is-primary" v-if="!isLoggedIn">
        <span class="icon">
          <i class="fa fa-sign-in"></i>
        </span>
        <span>Sign in</span>
      </router-link>
      <router-link to="/logout" class="button is-primary" v-else>
        <span class="icon">
          <i class="fa fa-sign-in"></i>
        </span>
        <span>Logout</span>
      </router-link>
    </span>

  </div>
</nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'navbar',
  data () {
    return {
      subject: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'isLoggedIn',
      'canManage'
    ]),
    ...mapState('user', {
      fullname (state) {
        // console.log(state.profile)
        if (Object.keys(state.profile).length === 0) {
          return 'guest'
        } else {
          return `${state.profile.firstName} ${state.profile.lastName}`
        }
      }
    })
  },
  methods: {
    logoClick () {
      // console.log(this.$route.path)
      if (this.$route.path === '/') {
        this.$router.go({
          path: '/',
          query: {
            t: new Date()
          }
        })
      } else {
        this.$router.push('/')
      }
    },
    searchClick () {
      this.$router.push({
        path: '/search',
        query: {
          subject: this.subject
        }
      })
    }
  }
}
</script>

<style scoped>
.nav {
  background-color: #ffdb4a;
}
@media screen and (max-width: 768px) {
      #menu-toggle:checked + .nav-menu {
        display: block;
      }
    }
</style>
