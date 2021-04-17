<template>
  <div class="back_top">
    <img src="~@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {}
}
</script>

<style lang="less" scoped>
.back_top {
  position: fixed;
  right: 8px;
  bottom: 55px;

  img {
    width: 43px;
    height: 43px;
  }
}
</style>