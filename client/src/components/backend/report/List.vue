<template>
  <div class="report-list">
    <table class="table">
      <thead>
        <tr>
          <th>ชื่อคอร์ส</th>
          <th>ชื่อวิชา</th>
          <th>ระดับชั้น</th>
          <th>แก้ไขล่าสุด</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses">
          <td>{{ course.name }}</td>
          <td>{{ course.subject }}</td>
          <td>{{ course.level.name }}</td>
          <td>{{ course.updatedAt | formatDate }}</td>
          <td><router-link :to="`/backend/course/edit/${course._id}`">แก้ไข</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/api/'
import dateFormat from 'dateformat'

export default {
  name: 'backend_report_list',
  data () {
    return {
      reports: []
    }
  },
  filters: {
    formatDate (value) {
      const dateObj = new Date(value)
      return dateFormat(dateObj, 'd mmmm yyyy, h:MM:ss TT')
    }
  },
  async mounted () {
    const res_ = await api.report.getReport()
    this.reports = res_.body
  }
}
</script>
