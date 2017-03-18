<template>
  <div class="home">
    <NavBar></NavBar>
    <div class=" container is-fluid">
      <div class="columns home--top">
        <div class="column">
          <SearchBox></SearchBox>
        </div>
        <div class="column">
          <ImageSlide></ImageSlide>
        </div>
      </div>
      <div class="course home--course">
        <CourseBox></CourseBox>
        <CourseBox></CourseBox>
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

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleSelect  (key, keyPath) {
      console.log(key, keyPath)
    }
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
