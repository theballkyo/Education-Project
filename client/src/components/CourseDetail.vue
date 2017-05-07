<template>
  <div class="course-detail">
    <h1>{{ $route.params.id }}</h1>
    <h3>{{ this.course }}</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'courseDetail',
  mounted () {
    this.requestCourseById(parseInt(this.$route.params.id))
  },
  methods: {
    ...mapActions('course', [
      'requestCourseById'
    ])
  },
  computed: {
    ...mapGetters('course', [
      'getCourseById'
    ]),
    course () {
      return this.getCourseById(parseInt(this.$route.params.id))
    }
  }
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // }
}
</script>

<style scoped>

</style>
