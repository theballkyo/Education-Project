<template>
  <div class="courses">
    <h2 v-if="isLoading">Loading...</h2>
    <h2 v-if="error && !isLoading">มีข้อผิดพลาดในการรับข้อมูลคอร์สเรียน โปรดติดต่อ...</h2>
    <ul v-show="!isLoading">
      <li v-for="course in allCourses">
        <router-link :to="`/course/${course.id}`">{{ course.name }}</router-link>
      </li>
    </ul>
    <h3 v-show="!isLoading"><router-link :to="`?page=${page + 1}`">Next</router-link></h3>
    <router-link to="/logout">logout</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
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
    this.requestAllCourses({page: this.page})
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
