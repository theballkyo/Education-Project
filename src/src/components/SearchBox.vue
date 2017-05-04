<template>
  <div class="search-box">
    <h1 class="title">ค้นหาคอร์สเรียนที่ต้องการได้ที่นี้!</h1>
    <hr>
    <form @keydown.enter.prevent="onSearch" class="search">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">วิชา</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" v-model="course.subject" placeholder="ชื่อวิชา">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">ระดับชั้น</label>
        </div>
        <div class="field-body">
          <!--<div class="field">
            <div class="control">
              <input class="input" type="text" v-model="course.level" placeholder="ระดับชั้น">
            </div>
          </div>-->
          <div class="field">
            <p class="control">
              <label class="checkbox" v-for="level in levels">
                <input :value="level" type="checkbox" v-model="course.level">
                {{ level }} 
              </label>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">ชื่อสถาบันที่สอน</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <label class="checkbox" v-for="institute in institutes">
                <input :value="institute" type="checkbox" v-model="course.institute">
                {{ institute }} 
              </label>
            </p>
          </div>
          <!--<div class="field">
            <div class="control">
              <input class="input" type="text" v-model="course.institute" placeholder="ชื่อสถาบันที่สอน">
            </div>
          </div>-->
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">ช่วงราคา</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left has-icons-right">
              <vue-slider @callback="onPriceChange" v-bind="priceSlider" v-model="course.price"></vue-slider>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" v-model="course.price[0]" placeholder="ราคามากกว่า">
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left has-icons-right">
              <input class="input" type="text" v-model="course.price[1]" placeholder="ราคาไม่เกิน">
            </p>
          </div>
        </div>
      </div>
    <div class="field">
        <button class="button is-warning is-fullwidth is-large" @click="onSearch">ค้นหาเลย</button>
    </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import api from '@/api/'
import vueSlider from 'vue-slider-component'

export default {
  name: 'search-box',
  data () {
    return {
      priceSlider: {
        value: [
          2600,
          5000
        ],
        width: '100%',
        height: 8,
        dotSize: 16,
        min: 0,
        max: 10000,
        disabled: false,
        show: true,
        tooltip: 'always',
        formatter: '{value} Baht',
        bgStyle: {
          'backgroundColor': '#fff',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        processStyle: {
          'backgroundColor': '#ffdd57'
        }
      },
      course: {
        subject: '',
        level: [],
        institute: [],
        price: [2600, 5000]
      },
      levels: [],
      institutes: []
    }
  },
  methods: {
    ...mapActions('search', [
      'searchCourseSettings'
    ]),
    onSearch () {
      const datas = {
        subject: this.course.subject,
        level: this.course.level.join(','),
        institute: this.course.institute.join(','),
        priceMin: this.course.price[0],
        priceMax: this.course.price[1]
      }
      this.searchCourseSettings({...this.course})
      this.$emit('onSearch', datas)
      this.$router.push({
        path: '/search',
        query: datas
      })
    },
    onPriceChange (value) {
      this.searchCourseSettings({...this.course})
    }
  },
  async beforeCreate () {
    const levelRaw = await api.course.getLevels()
    const instituteRaw = await api.institute.getList()
    this.levels = levelRaw.body
    this.institutes = instituteRaw.body
  },
  destroyed () {
    console.log('destroyed')
  },
  components: {
    vueSlider
  }
}
</script>

<style lang="scss" scoped>
form {
  &.search {
    padding: 0 20px;
    label {
      color: gainsboro;
    }
  }
}
.search-box {
  background: #252525;
  padding-bottom: 30px;
  height: 100%;
}
.title {
  color: #fff;
  padding: 25px 40px 0 40px;
}
</style>
