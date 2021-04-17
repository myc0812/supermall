<template>
  <div class="tab_control">
    <div
      class="tab_control_item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="changeTabControl(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    changeTabControl(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }
};
</script>

<style lang="less" scoped>
.tab_control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #fff;

  .tab_control_item {
    flex: 1;

    span {
      padding: 5px;
    }
  }
}

.active {
  color: var(--color-high-text);

  span {
    border-bottom: 3px solid var(--color-tint);
  }
}
</style>
