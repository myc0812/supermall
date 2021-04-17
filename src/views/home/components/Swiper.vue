<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <a :href="item.link">
          <img :src="item.image"/>
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    swiperList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper img{
  width: 100%;
  height: 100%;
}
</style>