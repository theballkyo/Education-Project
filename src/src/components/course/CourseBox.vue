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
    <Loading v-if="isLoading"></Loading>
    <div class="columns is-multiline">
      <div v-for="course in courses" class="column is-one-quarter">
        <CourseCard :course="course"></CourseCard>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CourseCard from './CourseCard.vue'
import Loading from '../Loading.vue'

export default {
  name: 'course-box',
  props: {
    title: {
      type: String,
      default: 'คอร์สเรียนมาใหม่'
    },
    courses: {
      type: Array,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    CourseCard,
    Loading
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
  height: 3.25rem;
  padding: 0 2.5rem 0 0!important;
  &.tabs {
    margin-bottom: 0;
  }
  li {
    border-left: 2px solid #FFCF00;
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
