<template>
  <div class="check_button" :class="{ check: isChecked }">
    <img src="~@/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButtom",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.check_button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  background-color: red;
  border-color: red;
}
</style>
