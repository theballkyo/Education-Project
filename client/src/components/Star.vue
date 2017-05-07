<template>
<div class="starRating" :data-rating="`r${Math.ceil(rating)}`">
  {{ text }} {{ rating }}
</div>
</template>

<script>
export default {
  name: 'start',
  props: [
    'rating',
    'text'
  ]
}
</script>

<style lang="scss" scoped>
// Mixin handles the repeating of the star content
// Using a great technique from: http://codepen.io/Protohominid/pen/rgzKF

@mixin starRating($num) {
  $chr: "\f005";
  $content: $chr;
  @for $i from 1 to $num {
      $content: $content + $chr;
  }
  content: "#{$content}";
}


.starRating {
  display: inline;
  &:before{
    font: normal normal normal 14px/1 FontAwesome;
    color: #ff8827;
  }

  @for $i from 1 through 5 {
    &[data-rating=r#{$i}] {
      &:before {
        @include starRating($i);
      }
    }
  }
}
</style>
