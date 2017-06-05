<template>
<div class="">
  <div class="columns home--top">
    <div v-if="onMounted" class="column">
      <SearchBox></SearchBox>
    </div>
    <div v-if="onMounted" class="column">
      <div class="imageSlideBox">
        <ImageSlider :count="imageList.length" :interval="5000">
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
      imageList: [],
      onMounted: false
    }
  },
  methods: {
    async fetchCourse (filters = {}) {
      let courses = []
      try {
        const courses_ = await api.course.getCourses({filters})
        courses = courses_.body
      } catch (e) {
        // Todo.
      }
      return courses
    },
    async subjectChange ({subject, keys}) {
      let sortBy = ''
      if (keys === 'newer') {
        sortBy = 'createdAt.-1'
      } else if (keys === 'rating') {
        sortBy = ''
      }

      this.course[keys].isLoading = true
      this.course[keys].data = []
      const courses = await this.fetchCourse({subject, sortBy})
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
  created () {
    for (let i = 0; i < 10; i++) {
      this.imageList.push(`https://unsplash.it/1024/720/?random&image=${i}`)
    }
  },
  async mounted () {
    this.onMounted = true
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

<style lang="scss">
.main-block {
  background-color: #c0c0c0;
}
.slider {
  line-height: 0;
  overflow-y: hidden;
  
  img {
    max-height: 500px;
    width: 100%;
  }

}
.imageSlideBox {
  background-color: #252525;
  border-left: 1px solid #f0f8ff;
}
</style>
