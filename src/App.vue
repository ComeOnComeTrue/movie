<template>
  <div class="app">
    <!-- 导航区域 -->
    <div class="nav-wrapper">
      <div class="nav-box">
        <div class="logo" @click="logoClick"></div>

        <div class="router">
          <router-link to="/home">首页</router-link>
          <router-link to="/movie">电影</router-link>
        </div>

        <div class="search">
          <input 
            type="text" 
            placeholder="请输入" 
            v-model="searchInfo" 
            @focus="searchFocus" 
            @blur="searchBlur"
            @keydown="searchKeydown($event)"
          />
          <span @click="searchClick">搜索</span>
          <template v-if="isSearchInfo">
            <ul>
              <li 
                v-for="(item,index) in searchDataList"
                :key="index"
              >
                <a @click="handleSearchRouter(item.id)">{{item.name}}</a>
              </li>
            </ul>
          </template>
          <template v-if="isSearcMovie">
            <ul>
              <li class="noneSearchInfo">暂无这个电影</li>
            </ul>
          </template>
        </div>

        <div class="login-box">
          <div class="login" v-if="!loginUser">
            <button class="login" @click="login">登录</button>
          </div>
          <div class="loginOut" v-else>
            <span>{{ loginUser.name }}</span>
            <button @click="loginOut">退出登录</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 视图 -->
    <div class="view-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInfo: "",
      oldSearchData: [], // 旧的搜索数据
      curSearchData: [], // 新的搜索数据
      isSearchInfo: false, // 是否有这个电影名
      isSearcMovie: false, // 没有这个电影显示
    };
  },
  created() {
    this.$axios.get("https://comeoncometrue.github.io/movie/dist/moviesData/movie.json").then(res => {
      this.oldSearchData = res;
    });
  },
  computed: {
    loginUser() {
      return this.$store.state.loginUser.data;
    },
    searchDataList() {
      let {oldSearchData} = this;
      if(this.searchInfo !== ''){
        this.curSearchData = oldSearchData.filter(ele => ele.name.includes(this.searchInfo)).slice(0, 10);
        this.isSearchInfo = true;
        this.curSearchData.length != 0 ? this.isSearcMovie = false : this.isSearcMovie = true;
        return this.curSearchData;
      }
      this.isSearcMovie = false;
      return this.oldSearchData.slice(0, 10);
    }
  },
  methods: {
    // 退出登录
    loginOut() {
      this.$store.dispatch("loginUser/loginOut");
      this.$router.push("/login");
    },
    logoClick() {
      if (this.$router.history.current.path == "/home") return;
      this.$router.push("/home");
    },
    // 点击登录
    login() {
      this.$router.push("/login");
    },
    // 搜索框聚焦
    searchFocus() {
      this.curSearchData = this.oldSearchData.slice(0, 10);
      this.isSearchInfo = true;
    },
    // 搜索框失焦
    searchBlur() {
      setTimeout( () => { // 失焦优先级高于click
        this.isSearchInfo = false;
      },200)
    },
    // 搜索框选择跳转
    handleSearchRouter(id) {
      if(`/movie/${id}` == this.$route.path) return;
      this.$router.replace("/movie/" + id);
      this.isSearchInfo = false;
      location.reload(true); // 强制刷新当前页面 
    },
    // 按enter键跳转
    searchKeydown(e) {
      if(e.keyCode != 13) return;
      this.searchSkip();
    },
    // 点击搜索 存数据 有跳转 没就提示
    searchClick() {
      this.searchSkip();
    },
    // 点击搜索跳转函数
    searchSkip() {
      const searchRouterData = this.oldSearchData.filter(ele => ele.name.includes(this.searchInfo)).slice(0, 10);
      if(this.searchInfo == ''){
        alert('请输入电影你想搜索的电影名');
        return;
      }else if(searchRouterData.length == 0){
        alert('暂无这个电影');
        return;
      }
      this.$store.commit('movie/searchRouterData', { 'searchRouterData' : searchRouterData});
      this.$router.push("/searchMovie");
      this.searchInfo = '';
    }
  }
};
</script>

<style>
.app {
  width: 100vw;
  height: 100vh;
}

.nav-wrapper {
  width: 100%;
  background-color: rgb(29, 27, 27);
}
.nav-box {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 1080px;
  height: 62px;
  line-height: 62px;
}

.logo {
  width: 62px;
  height: 62px;
  background-image: url(./assets/images/clipboard.png);
  cursor: pointer;
}

.router {
  height: 100%;
}
.router a {
  display: inline-block;
  height: 100%;
  color: #bdbdbd;
  font-weight: bold;
  text-decoration: none;
  margin-left: 72px;
  padding: 0 10px;
  font-size: 18px;
}
.router a:hover {
  color: #fff;
}
.router a.router-link-active {
  color: #fff;
}

.search {
  position: relative;
  margin: 0 80px;
  width: 300px;
  height: 100%;
}
.search input {
  width: 95%;
  height: 37px;
  outline: none;
  border: none;
  background-color: #fff;
  padding-left: 15px;
  border-radius: 20px;
}
.search span {
  position: absolute;
  width: 18%;
  height: 37px;
  right: 0px;
  line-height: 40px;
  top: 52%;
  transform: translateY(-50%);
  color: #999;
  font-weight: bold;
  cursor: pointer;
}
.search ul{
  position: absolute;
  width: 100%;
  background-color: #666;
  padding: 5px 0;
  z-index: 999;
  color: #fff;
  border-radius: 0 0 10px 10px;
}
.search ul li  {
  display: flex;
  height: 30px;
}
.search ul .noneSearchInfo{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-weight: 600;
  color: #999;
}
.search ul li  a{
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}
.search ul li a:hover{
  color: blue;
  background-color: #999;
}

.login-box {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
.login-box button {
  margin-left: 10px;
  outline: none;
  border-radius: 5px;
  font-weight: 600;
  padding: 5px 10px;
  cursor: pointer;
}
.login-box button:hover {
  transform: scale(1.05, 1.05);
}
.login-box .loginOut span{
  display: inline-block;
  margin-right: 50px;
  height: 100%;
  color: red;
  font-size: 18px;
  font-weight: 600;
}

.view-box {
  width: 100%;
  height: 100%;
  padding-top: 40px;
  background-color: #ddd;

}
</style>

