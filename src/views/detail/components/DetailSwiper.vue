<template>
  <div class="detail_swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item class="swiper_item" v-for="(item, index) in topSwiperList" :key="index">
        <img :src="item"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    topSwiperList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail_swiper {
  .swiper_item {
    height: 300px;
    overflow: hidden;
    
    img {
      width: 100%;
    }
  }
}
</style>