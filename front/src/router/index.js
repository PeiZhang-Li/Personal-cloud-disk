import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import register from "../components/register";
import index from '../components/index';
import safety from "../components/safety";
import photo from "../components/subassembly/photo";
import upload from "../components/subassembly/upload";
import  error  from  '../components/404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/index'
    }
    ,
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'/index',
          component:photo
        },
        {
          path: 'upload',
          component: upload
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/safety',
      name:'safety',
      component:safety
    },
    {
      path:'*',
      component:error
    }
  ]
})
