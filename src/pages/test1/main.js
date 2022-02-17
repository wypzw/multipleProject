// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import api from './api/index'
// Vue.use(echarts);
Object.defineProperty(Vue.prototype, '$api', {value: api})
// 全局事件总线
window.EventBus = new Vue();
// 注册全局插件
Vue.use(ElementUI);
// 关闭生产模式下给出的提示
Vue.config.productionTip = false;
// 生产环境错误日志
if (process.env.NODE_ENV === "production") {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    });
  };
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')