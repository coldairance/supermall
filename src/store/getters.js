export default {
  cartLength(state) {
    if(state.cartList) {
      return state.cartList.length
    }else {
      return 0
    }
  },
  cartList(state) {
    return state.cartList
  }
}
