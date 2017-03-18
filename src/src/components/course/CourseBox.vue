<template>
<div class="course-box">
  <div class="notification tabs is-right title-bar">
    <h1 class="title">{{ title }}</h1>
    <ul>
      <li class="is-active"><a>Pictures</a></li>
      <li><a>Music</a></li>
      <li><a>Videos</a></li>
      <li><a>Documents</a></li>
    </ul>
  </div>
  <div class="course--list">
    <div class="columns is-multiline">
      <div v-for="n in 10" class="column is-one-quarter">
        <CourseCard></CourseCard>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CourseCard from './CourseCard.vue'
export default {
  name: 'course-box',
  props: {
    title: {
      type: String,
      default: 'คอร์สเรียนมาใหม่'
    }
  },
  components: {
    CourseCard
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0;
  margin-left: 24px;
}
</style>

<style lang="scss">
.course-box {
  margin-bottom: 42px;
}
.course--list {
  padding: 24px 10px 0 10px;
  background-color: #989898;
  
}
.title-bar {
  background-color: #000;
  color: yellow;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 5.25rem;
  padding: 0 2.5rem 0 0!important;
  &.tabs {
    margin-bottom: 0;
  }
}
.tabs {
  ul {
    border-bottom: 0px;
    height: 100%
  }
  li {
    height: 100%;
    &:hover {
      background-color: #585858;
    }
    &.is-active {
      background-color: #00d1b2;
      a {
        color: #fff;
      }
    }
    a {
      color: #fff;
      border-bottom: 0px;
      height: 100%;
      &:hover {
        color: #fff;
      }
    }
  }
}

</style>
