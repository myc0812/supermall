<template>
  <div class="cart_list">
    <b-scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </b-scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BScroll from "../../../components/common/bscroll/BScroll.vue";

import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  components: { CartListItem, BScroll },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style lang="less" scoped>
.cart_list {
  height: calc(100vh - 93px - 40px);

  .content {
    height: 100%;
  }
}
</style>
