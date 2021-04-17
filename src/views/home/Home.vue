<template>
  <div id="home">
    <!-- 顶部任务栏 -->
    <nav-bar class="home_nav_bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <swiper :swiper-list="swiperList" />
    <!-- 推荐模块 -->
    <recommend :recommend-list="recommendList" />
    <!-- 每周推荐 -->
    <week-popular />
    <!-- tabControl -->
    <tab-control
      class="tab_control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <!-- 商品列表 -->
    <goods :goods="showGoods" />
  </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabcontrol/TabControl.vue";
import Goods from "@/components/content/goods/Goods";

// 首页独有组件
import Swiper from "./components/Swiper";
import Recommend from "./components/Recommend.vue";
import WeekPopular from "./components/WeekPopular.vue";

// 网络请求
import { getHomeMultiData, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  components: {
    Swiper,
    NavBar,
    Recommend,
    WeekPopular,
    TabControl,
    Goods
  },
  data() {
    return {
      swiperList: [], // 轮播图数据
      recommendList: [], // 推荐数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      }, // 商品列表
      type: "pop"
    };
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 轮播图和推荐数据的请求
    async getHomeMultiData() {
      let { data: res } = await getHomeMultiData();
      this.swiperList = res.banner.list;
      this.recommendList = res.recommend.list;
    },
    // 商业商品的请求
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      let { data: res } = await getHomeGoods(type, page);
      this.goods[type].list.push(...res.list);
      this.goods[type].page += 1;
    },
    // 点击切换商品
    tabClick(index) {
      switch (index) {
        case 0:
          this.type = "pop";
          break;
        case 1:
          this.type = "new";
          break;
        case 2:
          this.type = "sell";
      }
    }
  },
  computed: {
    showGoods() {
      return this.goods[type].list;
    }
  }
};
</script>

<style lang="less" scoped>
#home {
  padding-top: 44px;

  // 顶部任务栏
  .home_nav_bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    font-size: 18px;
    color: #fff;
    background-color: var(--color-tint);
    z-index: 1;
  }

  // tabControl
  .tab_control {
    position: sticky;
    top: 44px;
    z-index: 1;
  }
}
</style>
