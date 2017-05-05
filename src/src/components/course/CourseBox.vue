<template>
<div class="course-box">
  <div class="notification tabs is-right title-bar">
    <h1 class="title">{{ title }}</h1>
    <ul>
      <li :class="{ 'is-active': subject === 'Eng' }" @click="subjectChange('Eng')"><a>ภาษาอังกฤษ</a></li>
      <li :class="{'is-active': subject === 'Math'}" @click="subjectChange('Math')"><a>คณิตศาสตร์</a></li>
      <li :class="{'is-active': subject === 'Sci'}" @click="subjectChange('Sci')"><a>วิทยาศาสตร์</a></li>
      <li :class="{'is-active': subject === 'Com'}" @click="subjectChange('Com')"><a>คอมพิวเตอร์</a></li>
      <li :class="{'is-active': subject === 'Art'}" @click="subjectChange('Art')"><a>ศิลปะ</a></li>
      <li :class="{'is-active': subject === 'Admis'}" @click="subjectChange('Admis')"><a>เตรียมแอดมิดชั่น</a></li>
      <li :class="{'is-active': subject === ''}" @click="subjectChange('')"><a>ทั้งหมด</a></li>
    </ul>
  </div>
  <div class="course--list">
    <Loading v-if="isLoading"></Loading>
    <transition-group name="fade-without-leave" tag="div" class="columns is-mobile is-multiline">
      <div v-if="courses.length > 0 && !isLoading" v-for="course in courses" v-bind:key="course._id" class="column is-one-quarter-desktop is-one-mobile is-half-tablet">
        <CourseCard :course="course"></CourseCard>
      </div>
      <div v-if="courses.length < 1 && !isLoading" class="column 	has-text-centered" key="notfound">แย่จังเลย ไม่พบคอร์สเรียน</div>
    </transition-group>
  </div>
</div>
</template>

<script>
import CourseCard from './CourseCard.vue'
import Loading from '../Loading.vue'

export default {
  name: 'course-box',
  data () {
    return {
      subject: ''
    }
  },
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
    },
    keys: {
      type: String
    }
  },
  methods: {
    subjectChange (subject) {
      this.$emit('subjectChange', {subject, keys: this.keys})
      this.subject = subject
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
