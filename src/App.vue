<template>
  <div id="app">
    <main-tab-bar/>
    <router-view/>
  </div>
</template>


<script>
import MainTabBar from "./components/content/maintabbar/MainTabBar";

export default {
  components: {MainTabBar}
}
</script>

<style lang="less">
@import "assets/css/base.css";
</style>