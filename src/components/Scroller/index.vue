<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'MyScroller',
  props: {
    handleToScroll: {
      type: Function,
      default: function () {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {}
    }
  },
  mounted () {
    const scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    })

    scroll.on('scroll', (pos) => {
      this.handleToScroll(pos)
    })
    scroll.on('touchEnd', (pos) => {
      this.handleToTouchEnd(pos)
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
