<template>
  <div class="cart">
    <!-- 顶部任务栏 -->
    <nav-bar class="cart_nav_bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";

import CartList from "./components/CartList";
import CartBottomBar from "./components/CartBottomBar.vue";

import {mapGetters} from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style lang="less" scoped>
.cart {
  height: 100vh;

  .cart_nav_bar {
    position: relative;
    z-index: 2;
    background-color: var(--color-tint);
    color: #fff;
  }
}
</style>
