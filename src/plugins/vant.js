import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import { Lazyload } from "vant";
import "vant/lib/index.css";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: require("../assets/img/common/placeholder.png")
});
