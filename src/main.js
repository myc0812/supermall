import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vant";
import FastClick from "fastclick";
import show from "./components/common/toast/index";

Vue.use(show);
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
