// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.js'
import Qs from 'qs'
Vue.prototype.$qs=Qs;
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;
Vue.use(ElementUI);
/* eslint-disable no-new */
router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path === '/Register' || to.path === '/Getback') {
    next();
  } else {
    let token= localStorage.getItem('token')||'';
    if(token.length===0){
      next('/login')
    }else {
       axios.post('/api/verify',Qs.stringify( {'token':token}),{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          if(res.data=='1'){
            next()
          }else{
            alert('身份验证过期，请重新登录');
            localStorage.removeItem('token');
            next('/login');
          }
       })
    }
  }
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
