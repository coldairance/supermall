import {
  ADD_COUNTER,
  ADD_TO_CART
}  from './mutation-types'

export default {
  addCart(context, payload) {
    let product = context.state.cartList.find(item => item.iid === payload.iid)

    if(product) {
      context.commit(ADD_COUNTER, product)
    }else {
      context.commit(ADD_TO_CART, payload)
    }
  }
}
