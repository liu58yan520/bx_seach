import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import axios from 'axios';
import qs from 'qs';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import func from './func';

Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.axios = axios;
Vue.prototype.$qs = qs;
Vue.use(func);
// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('admin') == null){
    if (to.path == '/login')
      next()
    else
        next('/login')
  }else{
    next()
  }

 
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});