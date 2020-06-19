import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'; // 获取数据

import "velocity-animate" // 动画插件
import "./assets/reset.css"

// 初始化时，同步本地存储, 在localStorage永久储存里有没有登录信息
store.dispatch("loginUser/syncLocal"); // 查看有没有登录，初始化

Vue.config.productionTip = false
Vue.prototype.$axios = axios; // 方便每个组件都可以使用axios

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
