<template>
  <div id="home">
    <!-- 顶部任务栏 -->
    <nav-bar class="home_nav_bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- tabControl -->
    <tab-control
      ref="tabControl"
      class="tab_control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    />
    <!-- better-scroll -->
    <b-scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <swiper :swiper-list="swiperList" @swiperImgLoad="swiperImgLoad" />
      <!-- 推荐模块 -->
      <recommend :recommend-list="recommendList" />
      <!-- 每周推荐 -->
      <week-popular />
      <!-- tabControl -->
      <tab-control
        ref="tabControl1"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <!-- 商品列表 -->
      <goods :goods="showGoods" />
    </b-scroll>
    <!-- 返回顶部按钮 -->
    <back-top v-show="isShowBackTop" @click.native="backTop" />
  </div>
</template>

<script>
// 公共组件
import Goods from "@/components/content/goods/Goods";
import NavBar from "@/components/common/navbar/NavBar";
import BackTop from "@/components/content/backtop/BackTop";
import BScroll from "@/components/common/bscroll/BScroll";
import TabControl from "@/components/content/tabcontrol/TabControl";

// 首页独有组件
import Swiper from "./components/Swiper";
import Recommend from "./components/Recommend.vue";
import WeekPopular from "./components/WeekPopular.vue";

// 网络请求
import { getHomeMultiData, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    BScroll,
    Swiper,
    NavBar,
    Recommend,
    WeekPopular,
    TabControl,
    Goods,
    BackTop
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
      type: "pop", // 默认显示商品数据
      isShowBackTop: false, // 返回顶部按钮默认不显示
      tabOffsetTop: 0, // tabControl距离顶部的距离
      isTabFixed: false, // 默认不吸顶
      saveY: 0 // 原来的Y值距离 默认为0
    };
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);

    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  destroyed() {
    console.log("home");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    // 防抖函数
    debounce(func, delay) {
      let timer = null;

      return function(...args) {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
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

      this.$refs.scroll.finishPullUp();
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
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    // 点击返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    // 监听滚动的坐标
    contentScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;
      // 决定TabControl是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.type);
    },
    // 轮播图加载完成
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.type].list;
    }
  }
};
</script>

<style lang="less" scoped>
#home {
  position: relative;
  height: 100vh;
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

  .tab_control {
    position: relative;
    z-index: 1;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
}
</style>
