<template>
  <div class="review-form">
    <div class="field">
      <label class="label">Name</label>
      <p class="control">
        <input class="input" type="text" placeholder="ชื่อของคุณ" v-model="review.name">
      </p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Email" v-model="review.email">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">ข้อความ</label>
      <p class="control">
        <textarea class="textarea" placeholder="ข้อความ" v-model="review.message"></textarea>
      </p>
    </div>

    <div class="field">
      <rating :items="items" legend="" :value="review.rating" @change="update"></rating>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <button class="button is-primary" @click="onSubmit">Submit</button>
      </p>
    </div>

  </div>  
</template>

<script>
import Rating from 'vue-bulma-rating'

export default {
  name: 'review_form',
  data () {
    return {
      review: {
        name: '',
        email: '',
        message: '',
        rating: 5
      },
      items: [
        {
          title: '5 Stars',
          value: 5
        },
        {
          title: '4 Stars',
          value: 4
        },
        {
          title: '3 Stars',
          value: 3
        },
        {
          title: '2 Stars',
          value: 2
        },
        {
          title: '1 Star',
          value: 1
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', {review: this.review})
      this.review = {
        name: '',
        email: '',
        message: '',
        rating: 5
      }
    },
    update (val) {
      this.review.rating = val
    }
  },
  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
.image {
  background-color: #fff;
}
.review-form {
  background-color: #fff;
  padding: 25px;
}
</style>
