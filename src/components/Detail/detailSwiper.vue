<template>
  <div class="swiper-container" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    perView: {
      type: Number,
      default: 2
    },
    name: {
      type: String,
      default: 'yuan'
    }
  },
  mounted () {
    // console.log("mounted")
    new Swiper(`.${this.name}`, {
      slidesPerView: this.perView,
      spaceBetween: 30,
      centeredSlides: true
    })
  }
}
</script>
<style scoped lang="less">
.swiper-wrapper {
  margin-left: -150px;
}
</style>
