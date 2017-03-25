<template>
<div class="search-result">
  <NavBar></NavBar>
  <div class="notification tabs is-right title-bar">
    <ul>
      <li><a>เปลี่ยนข้อมูลการค้นหา</a></li>
      <li><a>ตัวกรอง</a></li>
      <li><a>เรียงลำดับจาก</a></li>
      <li><a>ราคา</a></li>
    </ul>
  </div>
  <div class="main-block">
    <Loading v-if="isLoading"></Loading>
    <div v-else class="columns is-multiline container is-fluid">
      <div class="column is-12"><h3 class="title is-3">พบคอร์สเรียน {{ courses.length }} รายการ จากคำค้นหา 
      {{ filters.subject ? `ชื่อคอร์ส ${filters.subject}` : '' }}
      {{ filters.level ? `ระดับชั้น ${filters.level}` : '' }}
      {{ filters.institute ? `สถาบัน ${filters.institute}` : '' }} 
      ราคาไม่เกิน {{ filters.price }} บาท</h3>
      *รอ Backend</div>
      <div v-for="course in courses" class="column is-one-quarter">
        <CourseCard :course="course"></CourseCard>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from './NavBar.vue'
import CourseCard from './course/CourseCard'
import api from '@/api/'
import Loading from './Loading.vue'

export default {
  name: 'searchResult',
  data () {
    return {
      courses: [],
      isLoading: true,
      filters: {}
    }
  },
  methods: {
    async fetchCourse () {
      try {
        const courses_ = await api.course.getCourses({filters: this.filters})
        this.courses = courses_.body
      } catch (e) {
        // Todo.
      }
      this.isLoading = false
    }
  },
  mounted () {
    this.filters = this.$route.query
    this.fetchCourse()
  },
  components: {
    NavBar,
    CourseCard,
    Loading
  }
}
</script>

<style lang="scss">
.search-result {
  .main-block {
    background-color: #c0c0c0;
  }
}
</style>
