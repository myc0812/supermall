import { ADD_TOCART, ADD_COUNTER } from "./mutations-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TOCART](state, payload) {
    state.cartList.push(payload)
  }
}