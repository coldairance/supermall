<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';

BScroll.use(PullUp)

export default {
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.initBscroll()
  },
  methods: {
    initBscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        pullUpLoad: this.pullUpLoad,
        probeType: this.probeType,
        click: true
      })

      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })

      this.pullUpLoad && this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })


      this.scroll.refresh();
    },
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refreshPullUp() {
      this.scroll && this.scroll.refresh()
   }
  }
}
</script>

<style scoped>

</style>
