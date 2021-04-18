<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar/>
    <!-- 轮播图 -->
    <detail-swiper :top-swiper-list="topSwiperList"/>
  </div>
</template>

<script>
import DetailNavBar from "./components/DetailNavBar.vue";
import DetailSwiper from "./components/DetailSwiper";

import {getDetail} from "@/network/detail";

export default {
  name: "Detail",
  components: {DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topSwiperList: []
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    this.getDetail()
  },
  methods: {
    async getDetail() {
      let {result: res} = await getDetail(this.iid)
      this.topSwiperList = res.itemInfo.topImages
    }
  }
};
</script>

<style lang="less" scoped>
</style>
