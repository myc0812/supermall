<template>
  <div class="goods">
    <goods-item v-for="(item, index) in goods" :goods-item="item" :key="index"/>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";

export default {
  name: "Goods",
  components: {GoodsItem},
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
  },
}
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2px;
}
</style>