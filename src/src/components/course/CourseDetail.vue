<template>
  <div class="course-detail main-block">
    <NavBar></NavBar>
    <div class="columns container is-fluid">
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
          <h2>ชื่อคอร์สเรียน</h2>
          <h1>ID {{ this.$route.params.id }}</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
          <h2>Second level</h2>
          <p>Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
          <ul>
            <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
            <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
            <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
            <li>Ut non enim metus.</li>
          </ul>
          <h3>Third level</h3>
          <p>Quisque ante lacus, malesuada ac auctor vitae, congue <a href="#">non ante</a>. Phasellus lacus ex, semper ac tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.</p>
        </div>
        <div class="course-more content">
          <h1 class="title">คอร์สเรียนที่คล้ายกัน</h1>
          <div v-for="n in 4" class="course-more--box">
            <p>ชื่อคอร์สเรียน</p>
            <p>ชื่อสถาบัน</p>
            <div class="columns">
              <div class="column">ชื่อวิชา</div>
              <div class="column">ระดับชั้น</div>
            </div>
            <p>ราคา/จำนวนชัวโมง</p>
            <hr>
          </div>
        </div>
      </div>
    </div>
    <FooterBox></FooterBox>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavBar from '../NavBar.vue'
import FooterBox from '../FooterBox.vue'

export default {
  name: 'courseDetail',
  props: [
    'id'
  ],
  mounted () {
    // this.requestCourseById(parseInt(this.$route.params.id))
  },
  methods: {
    ...mapActions('course', [
      'requestCourseById'
    ])
  },
  computed: {
    ...mapGetters('course', [
      'getCourseById'
    ]),
    course () {
      return this.getCourseById(parseInt(this.$route.params.id))
    }
  },
  components: {
    NavBar,
    FooterBox
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
