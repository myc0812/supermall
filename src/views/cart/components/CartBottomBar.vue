<template>
  <div class="cart_bottom_bar">
    <!-- 全选按钮 -->
    <div class="check_content">
      <check-button class="checked_all"/>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class="totalPrice">
      合计:{{ totalPrice }}元
    </div>
    <!-- 去计算 -->
    <div class="calculate">
      去计算: {{ checkLength }}
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkbtn/CheckButton";

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {CheckButton},
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    }
  },
};
</script>

<style lang="less" scoped>
.cart_bottom_bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  background-color: #eee;


  .check_content {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .checked_all {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 5px;
    }
  }
  
  .totalPrice {
    margin-left: 20px;
  }
  
  .calculate {
    width: 90px;
    background-color: var(--color-tint);
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>
