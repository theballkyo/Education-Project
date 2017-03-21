<template>
  <div class="home main-block">
    <NavBar></NavBar>
    <div class="container is-fluid">
      <div class="columns home--top">
        <div class="column">
          <SearchBox></SearchBox>
        </div>
        <div class="column">
          <ImageSlide></ImageSlide>
        </div>
      </div>
      <div class="course home--course">
        <CourseBox :courses="course.all" :isLoading="course.isLoading"></CourseBox>
        <CourseBox :courses="course.all" :isLoading="course.isLoading"></CourseBox>
      </div>
      <div class="review columns">
        <div class="column">
          <ReviewBox></ReviewBox>
        </div>
        <div class="column">
          <ReviewBox></ReviewBox>
        </div>
      </div>
    </div>
    <FooterBox></FooterBox>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import SearchBox from './SearchBox.vue'
import ImageSlide from './ImageSlide.vue'
import CourseBox from './course/CourseBox.vue'
import ReviewBox from './review/ReviewBox.vue'
import FooterBox from './FooterBox.vue'
import api from '@/api/'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      course: {
        all: [],
        isLoading: true
      }
    }
  },
  methods: {
    handleSelect  (key, keyPath) {
      console.log(key, keyPath)
    },
    async fetchCourse () {
      try {
        const courses_ = await api.course.getCourses()
        this.course.all = courses_.body
      } catch (e) {

      }
      this.course.isLoading = false
    }
  },
  watch: {
    '$route' () {
      this.fetchCourse()
    }
  },
  mounted () {
    window.setTimeout(() => {
      this.fetchCourse()
    }, 2000)
  },
  components: {
    NavBar,
    SearchBox,
    ImageSlide,
    CourseBox,
    FooterBox,
    ReviewBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home--top .column{
  padding-right: 0px;
  padding-left: 0px;
}
.home--top {
  margin: 30px 0px;
}
</style>

<style>
.main-block {
  background-color: #c0c0c0;
}
</style>
