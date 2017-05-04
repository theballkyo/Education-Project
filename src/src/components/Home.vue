<template>
<div class="">
  <div class="columns home--top">
    <div class="column">
      <SearchBox></SearchBox>
    </div>
    <div class="column">
      <div class="imageSlideBox">
        <ImageSlider :count="imageList.length" :interval="3000">
          <div v-for="img in imageList" class="slider" :style="`width: ${ 100 / imageList.length }%;`">
            <img :src="img">
          </div>
        </ImageSlider>
      </div>
    </div>
  </div>
  <div class="course home--course">
    <CourseBox keys="newer" title="คอร์สเรียนมาใหม่" :courses="course.newer.data" :isLoading="course.newer.isLoading" @subjectChange="subjectChange"></CourseBox>
    <CourseBox keys="rating" title="คอร์สที่กำลังฮิต" :courses="course.rating.data" :isLoading="course.rating.isLoading" @subjectChange="subjectChange"></CourseBox>
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
</template>

<script>
import NavBar from './NavBar.vue'
import SearchBox from './SearchBox.vue'
import ImageSlider from './image/Slider.vue'
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
        newer: {
          data: [],
          isLoading: true
        },
        rating: {
          data: [],
          isLoading: true
        }
      },
      imageList: ['https://lorempixel.com/1024/720/nature/1', 'https://lorempixel.com/1024/720/nature/2', 'https://lorempixel.com/1024/720/nature/3', 'https://lorempixel.com/1024/720/nature/7', 'https://lorempixel.com/1024/720/nature/5', 'https://lorempixel.com/1024/720/nature/6']
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
      this.course[keys].data = []
      const courses = await this.fetchCourse({subject, keys})
      this.course[keys].data = courses.courses
      this.course[keys].isLoading = false
    }
  },
  watch: {
    async '$route' () {
      const courses = await this.fetchCourse()
      this.course.newer.data = courses.courses
      this.course.rating.data = courses.courses
      this.course.newer.isLoading = false
      this.course.rating.isLoading = false
    }
  },
  async mounted () {
    const courses = await this.fetchCourse()
    this.course.newer.data = courses.courses
    this.course.rating.data = courses.courses
    this.course.newer.isLoading = false
    this.course.rating.isLoading = false
  },
  components: {
    NavBar,
    SearchBox,
    ImageSlider,
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
.slider img{
  max-height: 500px;
  width: 100%;
  line-height: 0;
  overflow-y: hidden;
}
.imageSlideBox {
  background-color: #252525;
  border-left: 1px solid #f0f8ff;
}
</style>
