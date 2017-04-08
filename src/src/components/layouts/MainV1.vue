<template>
  <div class="home main-block">
    <NavBar></NavBar>
    <div class="container is-fluid">
      <router-view></router-view>
    </div>
    <FooterBox></FooterBox>
  </div>
</template>

<script>
import NavBar from '../NavBar.vue'
import FooterBox from '../FooterBox.vue'
import api from '@/api/'

export default {
  name: 'layout-mainv1',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      course: {
        newer: {
          data: [],
          isLoading: true
        },
        rating: {
          data: [],
          isLoading: true
        }
      }
    }
  },
  methods: {
    async fetchCourse (filters = {}) {
      let courses = []
      try {
        const courses_ = await api.course.getCourses({filters})
        courses = courses_.body
      } catch (e) {

      }
      return courses
    },
    async subjectChange ({subject, keys}) {
      this.course[keys].isLoading = true
      const courses = await this.fetchCourse({subject})
      this.course[keys].data = courses
      this.course[keys].isLoading = false
    }
  },
  watch: {
    async '$route' () {
      const courses = await this.fetchCourse()
      this.course.newer.data = courses
      this.course.rating.data = courses
      this.course.newer.isLoading = false
      this.course.rating.isLoading = false
    }
  },
  async mounted () {
    const courses = await this.fetchCourse()
    this.course.newer.data = courses
    this.course.rating.data = courses
    this.course.newer.isLoading = false
    this.course.rating.isLoading = false
  },
  components: {
    NavBar,
    FooterBox
  }
}
</script>
<style>
.main-block {
  background-color: #c0c0c0;
}
</style>
