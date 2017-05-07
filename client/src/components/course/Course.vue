<template>
  <div class="course container is-fluid">
    <CourseBox title='คอร์สเรียนยอดนิยม'></CourseBox>
    <CourseBox></CourseBox>
  </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CourseBox from './CourseBox.vue'

export default {
  name: 'course',
  computed: {
    ...mapGetters('course', [
      'allCourses'
    ]),
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error
    }),
    page () {
      return parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    // When page changes, update datas.
    page (data) {
      this.requestAllCourses({page: data})
    }
  },
  created () {
    // Initial courses
    // this.requestAllCourses({page: this.page})
  },
  methods: {
    ...mapActions('course', [
      'requestAllCourses'
    ])
  },
  data () {
    return {
      msg: 'Courses'
    }
  },
  components: {
    CourseBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
