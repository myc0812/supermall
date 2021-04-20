import {ADD_TOCART, ADD_COUNTER} from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量+1");
      } else {
        payload.count = 1;
        context.commit(ADD_TOCART, payload);
        resolve("添加购物车成功");
      }
    })
  }
};
