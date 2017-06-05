<template>
  <div class="course-edit">
    <FormCourse @onSubmit="onSubmit" title="แก้ไขข้อมูลคอร์ส" submitText="แก้ไข" :course="course" v-if="course"></FormCourse>
  </div>
</template>

<script>
import api from '@/api'
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
    onSubmit ({course}) {
      console.log(course)
    }
  },
  async created () {
    const res_ = await api.course.getCourseById(this.id)
    this.course = res_.body
    this.course.level = this.course.level._id
  },
  components: {
    FormCourse
  }
}
</script>
