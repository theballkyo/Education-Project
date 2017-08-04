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
        <label class="label">ชื่อสถาบัน</label>
      </div>
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="ชื่อสถาบัน" v-model="course.institute">
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
            <span class="select is-fullwidth">
              <select v-model="course.subject">
                <option v-for="subject in subjectList" :value="subject">{{subject}}</option>
              </select>
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
              <i class="fa fa-usd"></i>
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
            <input class="input" type="text" placeholder="ราคาโปรโมชั่น" v-model="course.promotionPrice">
            <span class="icon is-small is-left">
              <i class="fa fa-usd"></i>
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
              <i class="fa fa-envelope"></i>
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
              <i class="fa fa-phone"></i>
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
              <i class="fa fa-chrome"></i>
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
        <label class="label">ระยะเวลาที่สอน</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <datepicker :config="{ wrap: true, enableTime: true }" placeholder="เริ่มสอน" readonly v-model="course.startDate">
            </datepicker>
            <span class="icon is-small is-left">
              <i class="fa fa-calendar"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <datepicker :config="{ wrap: true, enableTime: true }" placeholder="สิ้นสุด" readonly v-model="course.endDate">
            </datepicker>
            <span class="icon is-small is-left">
              <i class="fa fa-calendar"></i>
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
              <input type="checkbox" value="0" v-model="course.dayOfWeek">
              วันอาทิตย์
            </label>
          </div>
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
            <input class="input" type="text" placeholder="จำนวนชั่วโมงเรียนต่อวัน" :value="hourPerDayCal" disabled>
            <span class="icon is-small is-left">
              <i class="fa fa-clock-o"></i>
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
            <input class="input" type="text" placeholder="จำนวนวันที่เรียน" :value="totalDayCal" disabled>
            <span class="icon is-small is-left">
              <i class="fa fa-sun-o"></i>
            </span>
          </p>
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
            <input class="input" type="file" placeholder="รูปภาพ Cover" @change="onImageChange($event)">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Slide image</label>
      </div>
      <div class="field-body">
        <div class="field" @dragover.prevent @drop="onFileDrop($event)" @dragover="onDragOver($event)">
          <p class="drop control is-expanded has-icons-left">
            <draggable class="images-box" v-model="images.slide" :options="{animation: 0}">
              <transition-group type="transition" :name="'flip-list'" tag="div" class="columns is-multiline">
                <div @click.prevent class="column is-one-quarter" v-for="(element, index) in images.slide" :key="index">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image">
                        <img :src="element.data || `${imageServer}images/${element.name}`" alt="Image">
                      </figure>
                    </div>
                    <footer class="card-footer">
                      <a class="card-footer-item" @click="deleteImage(index)">Delete</a>
                    </footer>
                  </div>
                </div>
              </transition-group>
            </draggable>
            <span class="droptext" @click="onSlideClick">Drop files here or click me</span>
            <input @change="onSlideChange" type="file" id="slide-img" style="display: none;" multiple/>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
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
import draggable from 'vuedraggable'
import api from '@/api/'
import { IMAGE_SERVER } from '@/config/'
// import dateFormat from 'dateformat'

export default {
  name: 'form_course',
  data () {
    return {
      slideImages: [],
      images: {
        cover: null,
        slide: []
      },
      imageServer: IMAGE_SERVER,
      levels: [],
      selectLevel: [],
      subjectList_: ['English', 'Math', 'Science', 'Computer', 'Art'],
      teachTime: ''
    }
  },
  props: {
    course: {
      type: Object,
      default () {
        return {
          name: '',
          institute: '',
          subject: '',
          level: '',
          description: '',
          teacher: '',
          price: '',
          promotionPrice: '',
          email: '',
          images: [],
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
      this.$emit('onSubmit', {course: this.course, images: this.images})
    },
    onImageChange (e) {
      this.images.cover = e.target.files
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
    },
    onFileDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.target.files || e.dataTransfer.files
      this.addFilesToSlideList(files)
    },
    onDragOver (e) {
      // console.log(e)
    },
    onSlideClick (e) {
      document.getElementById('slide-img').click()
    },
    onSlideChange (e) {
      const files = e.target.files
      this.addFilesToSlideList(files)
    },
    deleteImage (index) {
      this.images.slide.splice(index, 1)
    },
    addFilesToSlideList (files) {
      if (files.length < 1) {
        return
      }

      for (let i = 0; i < files.length; i++) {
        const fr = new FileReader()

        fr.onload = () => {
          let image = {
            data: fr.result,
            file: files[i],
            isNew: true
          }
          this.images.slide.push(image)
          console.log(image.file)
        }
        fr.readAsDataURL(files[i])
      }
    }
  },
  computed: {
    selectLevelComputed () {
      return this.levelList()
    },
    hourPerDayCal () {
      const start = new Date(this.course.startDate)
      const end = new Date(this.course.endDate)
      let range = end.getHours() - start.getHours()
      if (start.getMinutes() <= end.getMinutes()) {
        let diff = end.getMinutes() - start.getMinutes()
        diff = (diff / 100)
        range += diff
      } else {
        let diff = start.getMinutes() - end.getMinutes()
        diff = (0.6 - (diff / 100))
        console.log(diff.toFixed(2))
        range += diff
        // minus 1 hour
        range -= 1
      }
      range = range.toFixed(2)
      this.course.hourPerDay = parseFloat(range)
      return range
    },
    totalDayCal () {
      // const oneDay = 1000 * 60 * 60 * 24
      const start = new Date(this.course.startDate)
      const end = new Date(this.course.endDate)
      // let diff = end.getTime() - start.getTime()
      // diff = Math.round(diff / oneDay)
      // Sun day is 0
      let start_ = start
      let diff = 0
      let dayOfWeekInt = this.course.dayOfWeek.map(v => parseInt(v))
      while (start_ <= end) {
        let date = new Date(start_)
        let day = date.getDay()
        if (dayOfWeekInt.indexOf(day) > -1) {
          diff += 1
        }
        start_ = date.setDate(date.getDate() + 1)
      }

      // Set value
      this.course.totalDay = diff
      return diff
    },
    subjectList () {
      return this.subjectList_
    }
  },
  async beforeMount () {
    const levels_ = await api.course.getLevel()
    this.levels = levels_.body
  },
  mounted () {
    for (const image of this.course.images) {
      this.images.slide.push({
        isNew: false,
        name: image
      })
    }
  },
  components: {
    Datepicker,
    InputTag,
    draggable
  }
}
</script>

<style scoped>
.drop {
  text-align: center;
  padding: 50px;
  border: #dadada solid 10px;
  background-color: whitesmoke;
}
.droptext {
  display: block;
  cursor: pointer;
  font-weight: 800;
  margin-top: 10px;
  padding: 16px;
  background-color: #bdbdbd;
}
</style>
