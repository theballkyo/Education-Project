<template>
<nav class="nav has-shadow">
  <div class="nav-left">
    <a @click="logoClick" class="nav-item" href="#"><img src="https://dummyimage.com/640x160/252525/fff" alt="Bulma logo"></a>
  </div>

  <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
  <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
  <label for="menu-toggle" class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </label>
  <input type="checkbox" id="menu-toggle" class="is-hidden"/>
  <!-- This "nav-menu" is hidden on mobile -->
  <!-- Add the modifier "is-active" to display it on mobile -->
  <div class="nav-right nav-menu">
    <div class="nav-item">
      <p class="control">
        <input class="input" type="text" placeholder="Search a courses">
      </p>
      <button class="button">
        <span class="icon is-small">
          <i class="fa fa-search"></i>
        </span>
      </button>
    </div>
    <span class="nav-item">
      <a class="button is-primary">
        <span class="icon">
          <i class="fa fa-sign-in"></i>
        </span>
        <span>Sign in</span>
      </a>
    </span>
  </div>
</nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logoClick () {
      console.log(this.$route.path)
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
