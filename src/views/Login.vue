<template>
  <div class="login-wrapper">
    <div id="content">
      <div id="box">
        <div class="title">Login</div>
        <div class="input">
          <input type="text" id="username"  placeholder="用户名" v-model="loginId" />
          <br />
          <input type="password" id="password" placeholder="密码" v-model="loginPwd" />
          <br />
          <button type="button" @click="handleLogin">登录</button>
        </div>
      </div>
    </div>

    <Loading v-if="isLoading">加载中...</Loading>
  </div>
</template>

<script>
import Loading from "../components/Movie/MovieLoadingResult";
import { mapState } from "vuex";

export default {
  components: {
    Loading
  },
  data() {
    return {
      loginId: "admin", // 暂存数据
      loginPwd: "123456"
    };
  },
  computed: {
    isLoading() {
      // 第一种
      return this.$store.state.loginUser.isLoading;
    }
    // ...mapState({ // 第二种
    //     isLoading: state => state.loginUser.isLoading
    // })
  },
  methods: {
    async handleLogin() {
      const result = await this.$store.dispatch("loginUser/login", {
        // action 分发：（函数名，参数） 调用actions的login函数，从而操作mutations改变状态
        loginId: this.loginId,
        loginPwd: this.loginPwd
      });
      if (result) {
        // 登录成功 跳转首页
        this.$router.push("/");
      } else {
        alert("账号密码错误");
      }
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(243deg, #21d4fd 0%, #b721ff 100%);
}
#content {
  position: relative;
  width: 100%;
  height: 100%;
}
#box {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 360px;
  background-color: #fff;
  text-align: center;
  border-radius: 15px;
  border: 2px #fff solid;
  box-shadow: 10px 10px 5px #000000;
}

.title {
  line-height: 58px;
  margin-top: 20px;
  font-size: 36px;
  color: #000;
  height: 58px;
}

#box:hover {
  border: 2px #fff solid;
}

.input {
  margin-top: 20px;
}

input {
  margin-top: 5px;
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 13px 14px;
  width: 70%;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
}

button {
  margin-top: 20px;
  border: none;
  color: #000;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 15px;
  background-color: #cccccc;
}
button:hover {
  background-color: #b721ff;
  color: #fff;
}
</style>