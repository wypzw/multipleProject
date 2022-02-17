/* eslint-disable object-curly-spacing,no-trailing-spaces,no-trailing-spaces */
import Vue from "vue";
import Router from "vue-router";

// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);


/**
 * 公共权限
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "welcome" */'../views/index.vue'),
    redirect: '/welcome',
    meta: { title: '首页', icon: 'charts' },
    children: [{
      path: 'welcome',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "welcome" */'../views/home/index.vue'),
      meta: { title: '首页', icon: 'charts' }
    },]
  }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

const router = createRouter();
router.beforeEach((to, from, next) => {
    next();
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

