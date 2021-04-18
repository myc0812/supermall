<template>
  <div class="detail_nav_bar">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="detail_title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="detail_title_item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"], // 商品列表参数
      currentIndex: 0 // 默认选中为0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.detail_title {
  display: flex;

  .detail_title_item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
}

.back {
  margin-top: 6px;
}
</style>
