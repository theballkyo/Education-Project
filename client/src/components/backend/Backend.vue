<template>
  <div class="backend">
    <div class="columns">
      <div class="column is-3 backend-left">
        <aside class="menu">
          <p class="menu-label">
            จัดการคอร์สเรียน
          </p>
          <ul class="menu-list">
            <li><router-link to="/backend/course/list">ดูคอร์สเรียน</router-link></li>
            <li><router-link to="/backend/course/create">เพิ่มคอร์สเรียน</router-link></li>
          </ul>
          <p class="menu-label">
            จัดการโปร์ไฟล์
          </p>
        </aside>
      </div>

      <div class="column backend-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import api from '@/api/'

export default {
  name: 'backend',
  data () {
    return {
      course: {}
    }
  },
  async mounted () {
    // let response = await api.review.getById(this.id)
    // this.review = response.body
  }
}
</script>

<style lang="scss" scoped>
.menu {
  margin-left: 20px;
}
.backend-left {
  border-right: #f5f5f5 solid 2px;
}
.backend-right {
  margin-right: 20px; 
}
.backend {
  background-color: #fff;
  // padding: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
