<template>
  <div v-if="Object.keys(goodsInfo).length !== 0" class="detail_baseInfo">
    <div class="info_title">{{ goodsInfo.title }}</div>
    <div class="info_price">
      <span class="n_price">{{ goodsInfo.newPrice }}</span>
      <span class="o_price">{{ goodsInfo.oldPrice }}</span>
      <span v-if="goodsInfo.discount" class="discount">{{
        goodsInfo.discount
      }}</span>
    </div>
    <div class="info_other">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[goodsInfo.services.length - 1].name }}</span>
    </div>
    <div class="info_service">
      <span
        class="info_service_item"
        v-for="index in goodsInfo.services.length - 1"
        :key="index"
      >
        <img :src="goodsInfo.services[index - 1].icon" alt="" />
        <span>{{ goodsInfo.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  components: {},
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.detail_baseInfo {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
  .info_title {
    color: #222;
  }

  .info_price {
    margin-top: 10px;
    .n_price {
      font-size: 24px;
      color: var(--color-high-text);
    }

    .o_price {
      font-size: 13px;
      margin-left: 5px;
      text-decoration: line-through;
    }

    .discount {
      position: relative;
      top: -8px;
      font-size: 12px;
      padding: 2px 5px;
      color: #fff;
      background-color: var(--color-high-text);
      border-radius: 8px;
      margin-left: 5px;
    }
  }

  .info_other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    justify-content: space-between;
  }

  .info_service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .info_service_item {
      img {
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
      }

      span {
        font-size: 13px;
        color: #333;
      }
    }
  }
}
</style>
