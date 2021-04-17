<template>
  <div class="recommend">
    <div class="recommend_item" v-for="(item, index) in recommendList" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="recommend_item_title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props: {
    recommendList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;

  .recommend_item {
    margin-top: 6px;

    img {
      width: 80px;
      height: 80px;
    }

    .recommend_item_title {
      margin-top: 4px;
    }
  }
}
</style>