<template>
  <div class="course-edit">
    <form-course @onSubmit="onSubmit" title="แก้ไขข้อมูลคอร์ส" submitText="แก้ไข" :course="course" v-if="course"></form-course>
  </div>
</template>

<script>
import api from '@/api'
import swal from 'sweetalert2'
import FormCourse from '@/components/form/Course'

export default {
  name: 'backend_course_edit',
  data () {
    return {
      course: null
    }
  },
  props: {
    id: {
      type: String
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
        let res_ = await api.course.update(this.id, formData)
        if (res_.ok && res_.status === 200) {
          // Added a course
          swal('Update a course')
          this.$router.push({ name: 'backend/course/list' })
        }
      } catch (error) {
        console.log(error)
        swal({
          title: 'Error',
          type: 'error'
        })
      }

      // console.log(course)
    }
  },
  async created () {
    const res_ = await api.course.getCourseByIdForEdit(this.id)
    this.course = res_.body
    this.course.level = this.course.level._id
  },
  components: {
    FormCourse
  }
}
</script>
