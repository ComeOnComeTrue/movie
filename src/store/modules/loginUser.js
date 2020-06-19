import loginService from "@/movieServiceHttp"

export default {
    namespaced: true, // 开启命名空间
    state: {  // 组件共享的状态
        data: null, // 当前登录的用户为空
        isLoading: false, // 当前正在登录，加载中
    },
    mutations: { // 配置状态有哪些变化，每一个变化是一个函数，vuex里的state状态改变的唯一方式, 不可再这操作异步
        setIsLoading(state, payload) { // 加载中效果
            // 参数state,当前状态， payload （负载）可选的，传过来的参数信息
            state.isLoading = payload;
        },
        setUser(state, userObj) { // 用于改变登录的用户
            state.data = userObj;
        }
    },
    actions: { // 处理异步操作， 每个action 是一个函数
        async login(context, payload) { // 需要传入账号和密码{loginId: xxx, loginPwd: xxx}
            context.commit('setIsLoading', true); // 改变加载中效果
            const resp = await loginService.login(payload.loginId, payload.loginPwd);
            if (resp) {
                // 登录成功
                context.commit("setUser", resp);
                // 额外的操作，保存用户信息到localStorage
                localStorage.setItem("loginUser", JSON.stringify(resp));

                context.commit('setIsLoading', false);// 改变加载中效果
                return true;
            }
            context.commit('setIsLoading', false);// 改变加载中效果
            return false;
        },
        loginOut(context) { // 退出登录
            context.commit('setUser', null);
            localStorage.removeItem("loginUser");
        },
        syncLocal(context) { // 初始化时，同步本地存储
            const local = localStorage.getItem('loginUser');
            if (local) {
                // 已经登录
                const user = JSON.parse(local); // 拿出本地存储中的用户对象
                context.commit("setUser", user); // 同步到状态
            }
        }
    }

}