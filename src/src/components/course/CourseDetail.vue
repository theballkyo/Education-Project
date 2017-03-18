<template>
  <div class="course-detail">
    <h1>{{ id }}</h1>
    <h3>{{ this.course }}</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'courseDetail',
  props: [
    'id'
  ],
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
}
</script>

<style scoped>

</style>
