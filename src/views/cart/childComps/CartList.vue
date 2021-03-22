<template>
  <div class="cart-list">
    <scroll class="wrapper">
      <cart-list-item
      :key="index"
      v-for="(item,index) in cartList"
      :itemInfo="item" />
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
import CartBottomBar from './CartBottomBar.vue'
export default {
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    CartListItem,
    CartBottomBar

  }
}
</script>

<style scoped>
  .wrapper {
    position: fixed;
    top: 44px;
    bottom: calc(58px + 40px);
    left: 0;
    right: 0;
    overflow: hidden;
  }

</style>
