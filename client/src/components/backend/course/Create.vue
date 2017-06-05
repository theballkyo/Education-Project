<template>
  <div class="container content report">
    <form-course @onSubmit="onSubmit" title="เพิ่มคอร์สเรียน" submitText="เพิ่ม"></form-course>
  </div>
</template>

<script>
import FormCourse from '@/components/form/Course'
import swal from 'sweetalert2'
import api from '@/api/'

export default {
  name: 'backend_course_create',
  data () {
    return {
      course: {}
    }
  },
  methods: {
    async onSubmit ({course, images}) {
      let formData = new FormData()
      formData.append('course', JSON.stringify(course))
      // Add images if exist
      Object.entries(images).forEach(([key, value]) => {
        formData.append(key, value[0])
      })
      try {
        let res_ = await api.course.save(formData)
        if (res_.ok && res_.status === 200) {
          // Added a course
          swal('Added a course')
          this.$router.push({ name: 'backend/course/list' })
        }
      } catch (error) {
        console.log(error)
        swal({
          title: 'Error',
          type: 'error'
        })
      }
    }
  },
  async mounted () {
    // let response = await api.review.getById(this.id)
    // this.review = response.body
  },
  components: {
    FormCourse
  }
}
</script>

<style lang="scss" scoped>
.report {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
