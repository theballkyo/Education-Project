<template>
<div class="review-box container is-fluid">
  <h1 class="title">{{ title }}</h1>
  <Review></Review>
  <Review></Review>
</div>
</template>

<script>
import Review from './Review.vue'
export default {
  name: 'reviewBox',
  props: {
    title: {
      type: String,
      default: 'รีวิว...'
    }
  },
  components: {
    Review
  }
}
</script>

<style lang="scss">
.review-box {
  padding: 0.75rem;
  background-color: #4e4e4e;
  margin-bottom: 42px!important;
  h1 {
    &.title {
      color: #e7b000;
    }
  }
}
@media screen and (min-width: 768px) {

}
@media screen and (min-width: 1000px) {
  .review-box.container.is-fluid {
    padding: 10px 20px 20px 20px;
    margin: 0;
    max-width: none;
    width: auto;
  }
}
</style>
