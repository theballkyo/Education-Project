<template>
  <div class="course-detail main-block">
    <NavBar></NavBar>
    <Loading v-if="isLoading"></Loading>
    <transition name="fade">
      <div v-if="!isLoading" class="columns container is-fluid">
        <div class="column is-two-thirds">
          <div class="columns">
            <div class="column">
              <figure class="image">
                  <ImageSlider :count="list.length" :interval="3000">
                    <div v-for="img in list" class="slider" :style="`width: ${ 100 / list.length }%;`">
                      <img :src="img">
                    </div>
                  </ImageSlider>
              </figure>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column">
              <div class="review">
                <div class="column is-12 review--header">
                  <h1 class="title">รีวิว {{ course.reviews.length }} คน <small>คะแนนเฉลี่ย <Star :rating="averageRating"></Star></small></h1>
                </div>
                <div v-for="review in course.reviews" class="column is-12 review--box content">
                  <div class="columns">
                    <div class="column">
                      คะแนน <Star :rating="review.rating"></Star>
                    </div>
                    <div class="column">
                      <div class="report has-text-right">
                        <a href="#">ร้องเรียนรีวิวนี้</a>
                      </div>
                    </div>
                  </div>
                  <p>{{ review.comment }}</p>
                  <p>By {{ review.userId.firstName }} {{ review.userId.lastName }}</p>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="course-info content">
            <h1 class="title">ชื่อคอร์ส <small>{{ course.name }}</small></h1>
            <h1 class="title">ชื่อสถาบันที่สอน <small>{{ course.institute.name }}</small></h1>
            <p>
              <div class="columns">
                <div class="column">
                  <strong>วิชา</strong> {{ course.subject }}
                </div>
                <div class="column">
                  <strong>ระดับชั้น</strong> {{ course.level }}
                </div>
              </div>
            </p>
            <p></p>
            <p><strong>ราคา</strong> {{ course.price }} <strong>บาท</strong> / {{ course.hourPerDay * course.studyTimes}} <strong>ชั่วโมง</strong></p>
            <hr>
            <h2>รายละเอียด</h2>
            <p>{{ course.description }}</p>
            <p>
              <div class="text-header">รอบเรียน</div> {{ course.startDate | formatDate }} - {{ course.endDate | formatDate }}</p>
            <p>
              <div class="text-header">สถานที่</div>
              {{ course.address.line1 }} {{ course.address.line2 }} {{ course.address.city }} {{ course.address.country }}
            </p>
            <p>
              <div class="text-header">โปรโมชั่น</div> {{ course.promotionPrice }}</p>
            <p>
              <div class="text-header">เบอร์โทร</div> {{ course.phone }}</p>
            <p>
              <div class="text-header">เว็บไซต์</div> {{ course.website }}</p>
          </div>
          <div class="course-info content">
            <h1>คอร์สที่คล้ายกัน</h1>
            <div class="" v-for="i in 3">
              <h2>ชื่อคอร์ส {{ course.name }}</h2>
              <h3>ชื่อสถาบันที่สอน {{ course.institute.name }}</h3>
              <p>
                <div class="columns">
                  <div class="column">
                    <strong>วิชา</strong> {{ course.subject }}
                  </div>
                  <div class="column">
                    <strong>ระดับชั้น</strong> {{ course.level }}
                  </div>
                </div>
              </p>
              <p></p>
              <p>ราคา {{ course.price }} บาท / {{ course.hourPerDay * course.studyTimes}} ชั่วโมง</p>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <FooterBox></FooterBox>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import NavBar from '../NavBar.vue'
import api from '@/api/'
import FooterBox from '../FooterBox.vue'
import Loading from '../Loading.vue'
import ImageSlider from '../image/Slider.vue'
import Star from '../Star.vue'

export default {
  name: 'courseDetail',
  data () {
    return {
      course: {},
      errors: {},
      isLoading: true,
      showImg: 'https://dummyimage.com/1024x768/252525/fff&text=1',
      list: ['https://dummyimage.com/1024x768/252525/fff&text=1', 'https://dummyimage.com/1024x768/252525/fff&text=2', 'https://dummyimage.com/1024x768/252525/fff&text=3', 'https://dummyimage.com/1024x768/252525/fff&text=4', 'https://dummyimage.com/1024x768/252525/fff&text=5', 'https://dummyimage.com/1024x768/252525/fff&text=6']
    }
  },
  props: [
    'id'
  ],
  methods: {
    slider (id) {
      this.showImg = `https://dummyimage.com/1024x768/252525/fff&text=${id}`
    }
  },
  computed: {
    averageRating () {
      let total = 0.0
      this.course.reviews.forEach((review) => {
        total += review.rating
      })
      return total / this.course.reviews.length
    }
  },
  filters: {
    formatDate (value) {
      const dateObj = new Date(value)
      return dateObj.toDateString()
    }
  },
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
    Loading,
    ImageSlider,
    Star
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

  h1 {
    &.title {
      color: #5a5a5a;
      small {
        color: #2d2d2d;
        /* float: right; */
        font-size: 0.6em;
      }
    }
  }
}

.review {
  background: #fff;

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
  figure.image {
    cursor: pointer;
  }
}

.text-header {
  display: inline-block;
  width: 100px;
  font-weight: bold;
  color: #5a5a5a;
}

@media (max-width: 768px) {
  .text-header {
    display: block;
  }
}
</style>