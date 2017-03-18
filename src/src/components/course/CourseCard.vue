<template>
<div class="course-card card">
  <div class="card--subject">ระดับชั้น ป.1</div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img src="https://dummyimage.com/128x128/252525/fff" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">ชื่อสถาบันที่สอน</p>
        <p class="subtitle is-6">วิชาที่ต้องการ</p>
      </div>
    </div>

    <div class="content">
      <div class="has-text-right">
        <div>0 บาท</div>
        <div>2 ชั่วโมง / ครั้ง</div>
      </div>
      <div class="columns button-menu">
        <div class="column">
          <a class="button is-warning is-fullwidth"><i class="fa fa-search" aria-hidden="true"></i>
</a>
        </div>
        <div class="column">
          <a class="button is-warning is-fullwidth">button</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'courseCard'
}
</script>

<style lang="scss">
.card--subject {
  position: absolute;
  right: 0;
  border-left: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  padding: 5px;
}
.media-content {
 margin-top: 25px;
}
.card {
  .button {
    padding: 5px;
  }

  .content {
    padding-top: 10px;
    border-top: 1px solid #e8e8e8;
  }

  .button-menu {
    margin-top: 0px;
    .column {
      padding: 10px 2px;
    }
  }
}

</style>
