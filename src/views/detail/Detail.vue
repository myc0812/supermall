<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar
      class="detail_nav_bar"
      @titleClick="titleClick"
      ref="detailNavBarRef"
    />
    <b-scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-swiper-list="topSwiperList" />
      <!-- 商品信息 -->
      <detail-base-info :goods-info="GoodsInfo" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shopInfo" />
      <!-- 商品详情展示 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品参数 -->
      <detail-param-info ref="params" :param-info="goodsParamInfo" />
      <!-- 评论信息 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <!-- 推荐商品展示 -->
      <goods ref="recommend" :goods="recommendList" />
    </b-scroll>
    <!-- 底部任务栏 -->
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import Goods from "../../components/content/goods/Goods";
import BScroll from "../../components/common/bscroll/BScroll";

import DetailNavBar from "./components/DetailNavBar";
import DetailSwiper from "./components/DetailSwiper";
import DetailBaseInfo from "./components/DetailBaseInfo";
import DetailShopInfo from "./components/DetailShopInfo";
import DetailGoodsInfo from "./components/DetailGoodsInfo";
import DetailBottomBar from "./components/DetailBottomBar";
import DetailParamInfo from "./components/DetailGoodsParams";
import DetailCommentInfo from "./components/DetailCommentInfo";

import {
  getDetail,
  getRecommend,
  GoodsInfo,
  Shop,
  GoodsParam
} from "../../network/detail";

import { itemListenerMixin } from "../../common/mixin";

export default {
  name: "Detail",
  components: {
    DetailBottomBar,
    Goods,
    DetailCommentInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    BScroll,
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null, // 商品id
      topSwiperList: [], // 商品详情顶部轮播图列表
      GoodsInfo: {}, // 商品信息
      shopInfo: {}, // 商家信息
      detailInfo: {}, // 商品详情信息
      goodsParamInfo: {}, // 商品参数信息
      commentInfo: {}, // 评论信息
      recommendList: [], // 推荐商品
      themeTopY: [], // 主题的Y值
      currentIndex: 0
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    this.getDetail();
    this.getRecommendList();
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    async getDetail() {
      let { result: res } = await getDetail(this.iid);
      this.topSwiperList = res.itemInfo.topImages;

      // 商品信息
      this.GoodsInfo = new GoodsInfo(
        res.itemInfo,
        res.columns,
        res.shopInfo.services
      );
      // 商家信息
      this.shopInfo = new Shop(res.shopInfo);
      // 商品详情信息
      this.detailInfo = res.detailInfo;
      // 商品参数
      this.goodsParamInfo = new GoodsParam(
        res.itemParams.info,
        res.itemParams.rule
      );
      // 评论信息
      if (res.rate.cRate !== 0) {
        this.commentInfo = res.rate.list[0];
      }
    },
    async getRecommendList() {
      let { data: res } = await getRecommend();
      this.recommendList = res.list;
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopY = [];

      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index] - -44, 800);
    },
    contentScroll(position) {
      // 获取Y值
      const positionY = -position.y - -44;

      let length = this.themeTopY.length;
      for (let i = 0; i < this.themeTopY.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNavBarRef.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      const product = {};
      product.image = this.topSwiperList[0];
      product.title = this.GoodsInfo.title;
      product.desc = this.GoodsInfo.desc;
      product.price = this.GoodsInfo.realPrice;
      product.iid = this.iid;

      this.$store.dispatch("addCart", product);
    }
  }
};
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 2;
  background-color: #fff;
  height: 100vh;

  .detail_nav_bar {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 93px);
  }
}
</style>
