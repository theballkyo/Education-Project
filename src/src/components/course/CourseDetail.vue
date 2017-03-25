<template>
  <div class="course-detail main-block">
    <NavBar></NavBar>
    <Loading v-if="isLoading"></Loading>
    <div v-else class="columns container is-fluid">
      <div class="column is-two-thirds">
        <div class="columns">
          <div class="column">
            <figure class="image">
              <img src="https://dummyimage.com/1024x768/252525/fff">
            </figure>
          </div>
        </div>
        <div class="columns is-gapless">
          <div v-for="c in 4" class="column course-image is-hidden-mobile">
            <figure class="image">
              <img src="https://dummyimage.com/1024x768/252525/fff">
            </figure>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column">
            <div class="review">
              <div class="column is-12 review--header">
                <h1 class="title">รีวิว 4 คน</h1>
              </div>
              <div v-for="n in 4" class="column is-12 review--box content">
                <div class="columns">
                  <div class="column"><h1>Rating</h1></div>
                  <div class="column">
                    <div class="report has-text-right">
                      <a href="#">ร้องเรียนรีวิวนี้</a>
                    </div>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
                <p>By ....</p>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="course-info content">
          <h1>{{ course.name }}</h1>
          <h2>{{ course.institute }}</h2>
          <p>{{ course.subject }} || {{ course.level }}</p>
          <p>ราคา {{ course.price }} บาท / {{ course.hourPerDay * course.studyTimes}} ชั่วโมง</p>
          <hr>
          <h2>รายละเอียด</h2>
          <p>{{ course.description }}</p>
          <p>รอบเรียน</p>
          <p>สถานที่</p>
          <p>โปรโมชั่น</p>
          <p>เบอร์โทร</p>
          <p>เว็บไซต์</p>
        </div>
      </div>
    </div>
    <FooterBox></FooterBox>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import NavBar from '../NavBar.vue'
import api from '@/api/'
import FooterBox from '../FooterBox.vue'
import Loading from '../Loading.vue'

export default {
  name: 'courseDetail',
  data () {
    return {
      course: {},
      errors: {},
      isLoading: true
    }
  },
  props: [
    'id'
  ],
  async mounted () {
    try {
      const course_ = await api.course.getCourseById(this.$route.params.id)
      this.course = course_.body
    } catch (e) {
      this.errors = e
    }
    this.isLoading = false
  },
  components: {
    NavBar,
    FooterBox,
    Loading
  }
}
</script>

<style lang="scss" scoped>
.image img {
  max-height: 600px;
}
.course-info {
  background: #fff;
  padding: 10px 20px;
}
.review {
  background: #fff;

  &--box {
    
  }

  hr {
    height: 2px;
  }
}
.course-more {
  background: #989898;
  color: #fff;
  padding: 10px 20px;
  .title {
    color: #fff;
  }
}
.report {
  color: #808080;
}
.course-image {
  margin-right: 1px !important;
  &:last-child {
    margin-right: 0;
  }
}
</style>
