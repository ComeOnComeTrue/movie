import Vue from 'vue'
import Vuex from 'vuex'

import loginUser from "./modules/loginUser.js"
import movie from "./modules/movie.js"

Vue.use(Vuex)  // 用于在vue身上挂载一个$store

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 开发 严格模式 上线取消
  state: {  // 组件共享的状态
  },
  mutations: { // 配置状态有哪些变化，每一个变化是一个函数，vuex里的state状态改变的唯一方式, 不可再这操作异步
  },
  actions: { // 处理异步操作， 每个action 是一个函数
  },
  modules: { 
    loginUser,
    movie,
  },
})
