<template>
<div class="search-result">
  <NavBar></NavBar>
  <div class="notification tabs is-right title-bar">
    <ul>
      <li @click="toggleSearchBox"><a>เปลี่ยนข้อมูลการค้นหา</a></li>
      <li><a>เรียงลำดับจาก</a></li>
      <li @click="priceSort" ><a><span class="icon"><i :class="`fa fa-sort-amount-` + sort.price" aria-hidden="true"></i></span> ราคา</a></li>
    </ul>
  </div>
  <div class="main-block">
    <div class="columns is-multiline container is-fluid">
      <div class="column is-12" v-if="showSearchBox">
        <SearchBox @onSearch="onSearchBoxSearch"></SearchBox>
      </div>
      <div class="column is-12">
        <h3 class="title is-3">พบคอร์สเรียน {{ count }} รายการ จากคำค้นหา</h3>
        <span v-for="text in searchInfo" class="tag is-black search-info">{{text}}</span>
      </div>
      <div class="column is-12">
        <Pagination :total="count" :perPage="limit" :currentPage="page" @changePage="changePage"></Pagination>
      </div>
      <div class="column is-12">
        <Loading v-if="isLoading"></Loading>
        <transition-group name="fade-without-leave" tag="div" class="columns is-multiline">
          <div v-if="courses.length > 0 && !isLoading" v-for="course in courses" v-bind:key="course._id" class="column is-one-quarter">
            <CourseCard :course="course"></CourseCard>
          </div>
          <div v-if="courses.length < 1 && !isLoading" class="column 	has-text-centered" key="notfound">แย่จังเลย ไม่พบคอร์สเรียน</div>
        </transition-group>
      </div>
      <div class="column is-12">
        <Pagination :total="count" :perPage="limit" :currentPage="page" @changePage="changePage"></Pagination>
      </div>
    </div>
  </div>
  <FooterBox/>
</div>
</template>

<script>
import NavBar from './NavBar.vue'
import CourseCard from './course/CourseCard'
import api from '@/api/'
import Loading from './Loading.vue'
import FooterBox from '@/components/FooterBox.vue'
import SearchBox from './SearchBox.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'searchResult',
  data () {
    return {
      courses: [],
      isLoading: true,
      filters: {},
      sort: {
        price: 'asc'
      },
      showSearchBox: false,
      count: 0,
      page: 1,
      limit: 12
    }
  },
  methods: {
    async fetchCourse () {
      this.isLoading = true
      // this.courses = []
      try {
        this.filters.limit = this.limit
        this.filters.page = this.page
        // Remove not use key.
        delete this.filters.t
        const courses_ = await api.course.getCourses({filters: this.filters})
        this.courses = courses_.body.courses
        this.count = courses_.body.count
      } catch (e) {
        // Todo.
      }
      this.isLoading = false
    },
    priceSort () {
      if (this.sort.price === 'desc') {
        this.sort.price = 'asc'
        this.filters.sortBy = 'price.1'
      } else {
        this.sort.price = 'desc'
        this.filters.sortBy = 'price.-1'
      }
      this.refresh()
    },
    toggleSearchBox () {
      this.showSearchBox = !this.showSearchBox
    },
    changePage (page) {
      this.page = page
      this.refresh()
    },
    onSearchBoxSearch (datas) {
      this.page = 1
      this.showSearchBox = false
    },
    refresh () {
      const datas = {
        ...this.filters,
        sortBy: this.filters.sortBy,
        page: this.page,
        // Fix bug is sortBy is change but router push not working ?!
        t: Math.floor((Math.random() * 10) + 1)
      }
      // this.searchCourseSettings({...this.course})
      this.$router.push({
        path: '/search',
        query: datas
      })
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.count / this.filters.limit) || 0
    },
    searchInfo () {
      let info = []
      if (this.filters.subject) {
        info.push(`ชื่อคอร์ส ${this.filters.subject}`)
      }
      if (this.filters.level) {
        info.push(`ระดับชั้น ${this.filters.level}`)
      }
      if (this.filters.institute) {
        info.push(`สถาบัน ${this.filters.institute}`)
      }
      info.push(`ราคา ${this.filters.priceMin || 0} - ${this.filters.priceMax || 10000} บาท`)
      return info
    }
  },
  watch: {
    '$route' (val) {
      this.filters = this.$route.query
      this.fetchCourse()
    }
  },
  created () {
    this.filters = this.$route.query
    this.page = parseInt(this.filters.page) || 1
  },
  mounted () {
    this.fetchCourse()
  },
  components: {
    NavBar,
    CourseCard,
    Loading,
    FooterBox,
    SearchBox,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.search-info {
  clear: both;
}
.search-result {
  .main-block {
    background-color: #c0c0c0;
  }
}
</style>
