<template>
<footer class="footer">
  <div class="columns">
    <div class="column is-3">
      Eduo Demo 1.0
    </div>
    <div class="column is-3">
      <p>เนื้อหา</p>
      <ul>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
      </ul>
    </div>
    <div class="column is-3">
      <p>ข้อมูล</p>
      <ul>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
      </ul>
    </div>
    <div class="column is-3">
      <p>ติดต่อเรา</p>
      <ul>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
        <li><a href="#">test</a></li>
      </ul>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'footerBox'
}
</script>

<style lang="scss">
$font-color: #fff;
.footer {
  background: #000;
  color: $font-color;
  
  .content {
    color: $font-color;
  }

  strong {
    color: $font-color;
  }

  a {
    &:hover {
      color: #e8e8e8;
    }
  }
}
</style>
