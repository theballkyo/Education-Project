<template>
  <div class="container content report">
    <h1>รายงานคอมเม้นไม่เหมาะสม</h1>
    <blockquote v-if="review">
      {{ review.message }}
      <br>
      <b>โดย</b> {{ review.name }}
    </blockquote>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ช้อมูลผู้รายงาน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="ชื่อ" v-model="data.name">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" v-model="data.email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">เหตุใดถึงรายงาน</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="data.reason">
                <option value="ใช้ข้อความไม่เหมาะสม">ใช้ข้อความไม่เหมาะสม</option>
                <option value="สแปม">สแปม</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ข้อความอื่นๆที่จะฝากถึง</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea v-model="data.message" class="textarea" placeholder="Explain how we can help you"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button class="button is-primary" @click="onSubmit">
              ส่งข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Review from './Review.vue'
import swal from 'sweetalert2'
import api from '@/api/'

export default {
  name: 'reviewReport',
  data () {
    return {
      review: {},
      data: {
        name: '',
        email: '',
        reason: '',
        message: '',
        reviewId: ''
      }
    }
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    async onSubmit () {
      try {
        const res_ = await api.course.reportReview(this.data)
        console.log(res_)
        if (res_.ok) {
          swal('ส่งข้อมูลการรายงานเรียบร้อยแล้ว')
          this.$router.back()
        } else {
          swal('มีข้อผิดพลาดในการส่งข้อมูล')
        }
      } catch (e) {
        swal('มีข้อผิดพลาดในการส่งข้อมูล')
      }
    }
  },
  async mounted () {
    let response = await api.course.getReview(this.id)
    this.review = response.body
    this.data.reviewId = this.id
  },
  components: {
    Review
  }
}
</script>

<style lang="scss" scoped>
.report {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
