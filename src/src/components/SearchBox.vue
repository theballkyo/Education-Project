<template>
  <div class="search-box">
    <h1 class="title">ค้นหาคอร์สเรียนที่ต้องการได้ที่นี้!</h1>
    <hr>
    <div class="field">
      <p class="control">
        <input class="input" type="text" v-model="subject" placeholder="ชื่อวิชา">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input class="input" type="text" v-model="level" placeholder="ระดับชั้น">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input class="input" type="text" v-model="institute" placeholder="ชื่อสถาบันที่สอน">
      </p>
    </div>
    <div class="field columns">
      <div class="control column is-2">
        <input class="input" type="text" v-model="price" placeholder="< 0 บาท">
      </div>
      <div class="control column is-10">
        <input class="" type="range" min="0" v-model="price" max="10000" value="8000">
      </div>
    </div>
    <div class="field">
        <button class="button is-warning is-fullwidth is-large" @click="onSearch">ค้นหาเลย</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search-box',
  data () {
    return {
      subject: 'Eng',
      level: '',
      institute: '',
      price: 8000
    }
  },
  methods: {
    onSearch (event) {
      this.$router.push({
        path: '/search',
        query: {
          subject: this.subject,
          level: this.level,
          institute: this.institute,
          price: this.price
        }
      })
    }
  }
}
</script>

<style scoped>
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 13.8px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #ffdd57, 0px 0px 1px #ffe271;
  background: #ffdd57;
  border-radius: 1.3px;
  border: 0.2px solid #ffdd57;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #ffffff;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #ffdd57;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #ffdd57, 0px 0px 1px #ffe271;
  background: #ffdd57;
  border-radius: 1.3px;
  border: 0.2px solid #ffdd57;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #ffffff;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #ffdd57;
  border: 0.2px solid #ffdd57;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #ffdd57, 0px 0px 1px #ffe271;
}
input[type=range]::-ms-fill-upper {
  background: #ffdd57;
  border: 0.2px solid #ffdd57;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #ffdd57, 0px 0px 1px #ffe271;
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #ffffff;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  height: 8.4px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #ffdd57;
}
input[type=range]:focus::-ms-fill-upper {
  background: #ffdd57;
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
.field {
  padding: 0px 40px;
}
</style>
