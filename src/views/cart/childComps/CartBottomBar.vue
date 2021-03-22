<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
      @click.native="checkClick"
      :is-checked="isSelectAll"
      class="check-button"/>
      <span>全选</span>
      <div class="price">
        合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calClick">
        去计算：{{checkLength}}
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList'])
    ,
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((pre, item) => {
        return item.price * item.count + pre
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length == 0) {
        return false
      }else {
        return !this.cartList.find(item => !item.checked)
      }
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(element => {
          element.checked = false
        });
      }else {
        this.cartList.forEach(element => {
          element.checked = true
        });
      }
    },
    calClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请先选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 58px;
    z-index: 100;
  }

  .check-content {
    display: flex;
    height: 40px;
    align-items: center;
  }
  .check-button {
    height: 20px;
    width: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .price {
    margin-left: 10px;
  }

  .calculate {
   position: absolute;
   right: 5px;
   height: 40px;
   line-height: 40px;
   width: 90px;
   background-color: #f1c40f;
   text-align: center;
   color: #fff
  }


</style>
