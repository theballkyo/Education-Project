<template>
  <div v-if="course && course.address" class="content">
    <h1>{{ title }}</h1>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ชื่อคอร์สเรียน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="ชื่อคอร์สเรียน" v-model="course.name">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ชื่อวิชา</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            
            <input class="input" type="text" placeholder="ชื่อวิชา" v-model="course.subject">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ระดับชั้น</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <span class="select is-fullwidth">
              <select v-model="course.level">
                <option v-for="level in this.selectLevelComputed" :value="level.id" :disabled="level.disabled === true">{{ (new Array(level.index * 2 + 1)).join('&nbsp;') }}{{ level.name }}</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">รายละเอียดคอร์ส</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea col="5" class="textarea" placeholder="Explain how we can help you" v-model="course.description"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">อาจารย์ผู้สอน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            
            <input class="input" type="text" placeholder="อาจารย์ผู้สอน" v-model="course.teacher">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ราคา</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="ราคา" v-model="course.price">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ราคาโปรโมชั่น</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="ราคา" v-model="course.promotionPrice">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">อีเมล์สำหรับติดต่อ</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="อีเมล์สำหรับติดต่อ" v-model="course.email">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">เบอร์โทร</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="เบอร์โทร" v-model="course.phone">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">เว็บไซต์</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="เว็บไซต์" v-model="course.website">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">สถานที่เรียน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <textarea col="5" class="textarea" placeholder="ที่อยู่" v-model="course.address.line"></textarea>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label"></label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="columns">

            <div class="column">
              <div class="field">
                <label class="label">จังหวัด</label>
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" placeholder="จังหวัด" v-model="course.address.city">
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label">ประเทศ</label>
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" placeholder="ประเทศ" v-model="course.address.country">
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label">รหัสไปร์ษณีย์</label>
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" placeholder="รหัสไปร์ษณีย์" v-model="course.address.postalCode">
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>  

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">ระยะเวลาที่สอน</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left has-icons-right">
            <datepicker :config="{ wrap: true, mode: 'range', minDate: 'today', enableTime: true }" placeholder="ระยะเวลาที่สอน" readonly v-model="teachTime">
            </datepicker>
            <!--<input class="input" type="text" placeholder="สิ้นสุด" v-model="course.endDate">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>-->
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">จำนวนชั่วโมงเรียนต่อวัน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="จำนวนชั่วโมงเรียนต่อวัน" v-model="course.hourPerDay">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">จำนวนวันที่เรียน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="จำนวนวันที่เรียน" v-model="course.totalDay">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">วันที่เรียน</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" value="1" v-model="course.dayOfWeek">
              วันจันทร์
            </label>
            <label class="radio">
              <input type="checkbox" value="2" v-model="course.dayOfWeek">
              วันอังคาร
            </label>
            <label class="checkbox">
              <input type="checkbox" value="3" v-model="course.dayOfWeek">
              วันพุธ
            </label>
            <label class="checkbox">
              <input type="checkbox" value="4" v-model="course.dayOfWeek">
              วันพฤหัสบดี
            </label>
            <label class="checkbox">
              <input type="checkbox" value="5" v-model="course.dayOfWeek">
              วันศุกร์
            </label>
            <label class="checkbox">
              <input type="checkbox" value="6" v-model="course.dayOfWeek">
              วันเสาร์
            </label>
            <label class="checkbox">
              <input type="checkbox" value="7" v-model="course.dayOfWeek">
              วันอาทิตย์
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Tags</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input-tag placeholder="Tags" :tags="course.tags"></input-tag>
            <!--<input class="input" type="text" placeholder="Tags" v-model="course.tags">-->
          </p>
          <p>
            <small>กด Enter เพื่อเพิ่ม tag</small>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
      </div>
      <div class="field-body">
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">รูปภาพ Cover</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="file" placeholder="รูปภาพ Cover" @change="onImageChange($event, 'cover')">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">รูปภาพ Slide รูปที่ 1</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="file" placeholder="รูปภาพ Slide รูปที่ 1" @change="onImageChange($event, 'slide1')">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">รูปภาพ Slide รูปที่ 2</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="file" placeholder="รูปภาพ Slide รูปที่ 2" @change="onImageChange($event, 'slide2')">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">รูปภาพ Slide รูปที่ 3</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="file" placeholder="รูปภาพ Slide รูปที่ 3" @change="onImageChange($event, 'slide3')">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">รูปภาพ Slide รูปที่ 4</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="file" placeholder="รูปภาพ Slide รูปที่ 4" @change="onImageChange($event, 'slide4')">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
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
              {{ submitText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import InputTag from 'vue-input-tag'
import api from '@/api/'
export default {
  name: 'form_course',
  data () {
    return {
      images: {},
      levels: [],
      selectLevel: [],
      teachTime: ''
    }
  },
  props: {
    course: {
      type: Object,
      default () {
        return {
          name: '',
          subject: '',
          level: '',
          description: '',
          teacher: '',
          price: '',
          promotionPrice: '',
          email: '',
          phone: '',
          website: '',
          dayOfWeek: [],
          hourPerDay: '',
          totalDay: '',
          address: {
            line: '',
            city: '',
            country: '',
            postalCode: ''
          },
          startDate: '',
          endDate: '',
          tags: []
        }
      }
    },
    submitText: {
      type: String,
      default: 'ส่งข้อมูล'
    },
    title: {
      type: String,
      default: 'จัดการคอร์ส'
    }
  },
  methods: {
    onSubmit (e) {
      let time_ = this.teachTime.split(' to ')
      this.course.startTime = time_[0]
      this.course.endTime = time_[1]
      this.course.startDate = time_[0]
      this.course.endDate = time_[1]
      this.$emit('onSubmit', {course: this.course, images: this.images})
    },
    onImageChange (e, id) {
      this.images[id] = e.target.files
    },
    levelList (levels = [], selectLevel = [], index = 0) {
      if (levels.length === 0) {
        levels = this.levels
      }
      for (const i in levels) {
        selectLevel.push({id: levels[i]._id, code: levels[i].code, name: levels[i].name, disabled: levels[i].disabled, index})
        if (levels[i].children.length > 0) {
          this.levelList(levels[i].children, selectLevel, index + 1)
        }
      }
      return selectLevel
    }
  },
  computed: {
    selectLevelComputed () {
      return this.levelList()
    }
  },
  async mounted () {
    const levels_ = await api.course.getLevel()
    this.levels = levels_.body
  },
  components: {
    Datepicker,
    InputTag
  }
}
</script>
