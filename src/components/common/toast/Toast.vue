<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: null,
      isShow: false
    }
  },
  methods: {
    show(message, duration=1500) {
      if(!message) {
        return
      }
      this.isShow = true;
      this.message = message

      setTimeout(() => {
        this.isShow = false;
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 15px;
    color: white;
    background-color: rgba(0,0,0,.7);
    transform: translate(-50%, -50%);
    z-index: 999;
  }
</style>
