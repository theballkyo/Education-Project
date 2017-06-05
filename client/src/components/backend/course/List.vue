<template>
  <div class="course-list">
    <table class="table">
      <thead>
        <tr>
          <th>ชื่อคอร์ส</th>
          <th>ชื่อวิชา</th>
          <th>ระดับชั้น</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses">
          <td>{{ course.name }}</td>
          <td>{{ course.subject }}</td>
          <td>{{ course.level.name }}</td>
          <td><router-link :to="`/backend/course/edit/${course._id}`">แก้ไข</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/api/'

export default {
  name: 'backend_course_list',
  data () {
    return {
      courses: []
    }
  },
  async mounted () {
    const res_ = await api.course.getCourses({filters: {limit: 1000}})
    this.courses = res_.body.courses
  }
}
</script>
