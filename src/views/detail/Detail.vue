<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar />
    <b-scroll>
      <!-- 轮播图 -->
      <detail-swiper :top-swiper-list="topSwiperList" />
      <!-- 商品信息 -->
      <detail-base-info :goods-info="GoodsInfo" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shopInfo" />
    </b-scroll>
  </div>
</template>

<script>
import BScroll from "../../components/common/bscroll/BScroll";

import DetailNavBar from "./components/DetailNavBar.vue";
import DetailSwiper from "./components/DetailSwiper";
import DetailBaseInfo from "./components/DetailBaseInfo.vue";
import DetailShopInfo from "./components/DetailShopInfo.vue";

import { getDetail, GoodsInfo, Shop } from "../../network/detail";

export default {
  name: "Detail",
  components: {
    BScroll,
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topSwiperList: [],
      GoodsInfo: {},
      shopInfo: {}
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let { result: res } = await getDetail(this.iid);
      console.log(res);
      this.topSwiperList = res.itemInfo.topImages;

      // 商品信息
      this.GoodsInfo = new GoodsInfo(
        res.itemInfo,
        res.columns,
        res.shopInfo.services
      );
      // 商家信息
      this.shopInfo = new Shop(res.shopInfo);
    }
  }
};
</script>

<style lang="less" scoped></style>
