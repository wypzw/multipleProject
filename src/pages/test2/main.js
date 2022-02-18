import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import api from './api/index'
//自定义指令
import Directives from '$pages/dirictive/index'
Vue.use(Directives)
//自定义过滤器
import Filters from '$pages/fillters/index'
Vue.use(Filters)
Object.defineProperty(Vue.prototype, '$api', {value: api})
// 全局事件总线
window.EventBus = new Vue();
// 注册全局插件
Vue.use(ElementUI);
// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')