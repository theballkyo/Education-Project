<template>
  <div class="course-edit">
    <form-course @onSubmit="onSubmit" title="แก้ไขข้อมูลคอร์ส" submitText="แก้ไข" :course="course"></form-course>
  </div>
</template>

<script>
import api from '@/api'
import FormCourse from '@/components/form/Course'

export default {
  name: 'backend_course_edit',
  data () {
    return {
      course: {}
    }
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    onSubmit ({course}) {
      console.log(course)
    }
  },
  async mounted () {
    const res_ = await api.course.getCourseById(this.id)
    this.course = res_.body
  },
  components: {
    FormCourse
  }
}
</script>
