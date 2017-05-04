<template>
<div class="slider-wrapper">
  <div class="sliders clearfix" ref="sliders">
    <slot></slot>
  </div>
  <ul class="slider-nav">
    <li v-for="n in count"><span @click="circleClick(n-1)" class="circle" :class="{'active': n-1 === current}"></span></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'imageSlider',
  data () {
    return {
      current: 0
    }
  },
  props: ['count', 'interval'],
  methods: {
    goto (index) {
      if (index === 'next') {
        this.current++
      } else if (index === 'prev') {
        this.current--
      } else {
        this.current = parseInt(index)
      }
      this.current = (this.current) % this.count
      this.$refs.sliders.style.marginLeft = '-' + (this.current * 100) + '%'
    },
    circleClick (n) {
      this.goto(n)
    }
  },
  mounted () {
    let $sliders = this.$refs.sliders
    $sliders.style.width = (this.count * 100) + '%'
    // setInterval(() => {
    //   this.goto('next')
    // }, this.interval)
  }
}
</script>

<style lang="scss" scoped>
.circle {
  cursor: pointer;
}
.slider-wrapper {
  position: relative;
  overflow-x: hidden;
}

.slider-wrapper ::after {
  content: '';
  display: block;
  clear: both;
}

.slider-wrapper .sliders {
  width: 99999999px;
  transition: all 0.5s;
}

.slider-wrapper .sliders .slider {
  float: left;
}

.slider-wrapper ul.slider-nav {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  list-style: none;
}

.slider-wrapper ul.slider-nav li {
  float: left;
  margin: 0 3px;
}

.slider-wrapper ul.slider-nav li .circle {
  display: block;
  width: 10px;
  height: 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background: transparent;
}

.slider-wrapper ul.slider-nav li .circle.active {
  background: #fb83ac;
  border-color: #fb83ac;
}
</style>
