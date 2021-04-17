<template>
  <div class="goods_item">
    <div class="goods_item_img">
      <img :src="goodsItem.show.img" alt="">
    </div>
    <div class="goods_item_info">
      <p class="goods_item_info_title">{{ goodsItem.title }}</p>
      <span class="goods_item_info_price">￥{{ goodsItem.price }}</span>
      <span class="goods_item_info_collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods_item {
  position: relative;
  padding-bottom: 40px;

  width: 48%;

  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods_item_info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;

    .goods_item_info_title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }

    .goods_item_info_price {
      color: var(--color-high-text);
      margin-right: 20px;
    }

    .goods_item_info_collect {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("../../../assets/img/common/collect.svg");
      }
    }
  }
}
</style>