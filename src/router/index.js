import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import store  from '../store/index.js'

Vue.use(VueRouter)  // 用于在vue身上挂载一个$router

  const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home', // 根路由展示首页
    component: Home,
    // alias: '/'    // 起别名  路径显示是/ 展示的是home页面
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
  },
  {
    path: '/movie/:id',
    component: () => import('../views/MovieDetail.vue'),
    meta: { needLogin: true } // 配置导航守卫数据，自定义数据， 需要登陆后才可以查看
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/searchMovie',
    name: "SearchMovie",
    component: () => import('../views/SearchMovie'),
    meta: { needLogin: true } // 配置导航守卫数据，自定义数据， 需要登陆后才可以查看
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 注册全局守卫 
router.beforeEach((to, from, next) => { // 在路由跳转前触发
  if(to.meta && to.meta.needLogin) { // 配置有meta自定义信息，而且needLogin为true
    // 需要登录的页面
    if (store.state.loginUser.data) {
      // 已登录
      next(); 
    }else {
      next("/login");  // 跳转到登录页
    }
  }else {
    next();
  }
})


export default router
