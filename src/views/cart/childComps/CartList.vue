<template>
  <div class="cart-list">
    <scroll class="wrapper">
      <cart-list-item
      :key="index"
      v-for="(item,index) in cartList"
      :product="item" />
    </scroll>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    CartListItem

  }
}
</script>

<style scoped>

  .wrapper {
    height: calc(100vh - 44px);
  }

</style>
