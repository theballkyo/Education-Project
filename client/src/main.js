// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bulma/css/bulma.css'
import './assets/fadeStyle.css'
import 'pretty-checkbox/src/pretty.scss'
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'

// ...
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
