<template>
  <div class="movieDetail-box" v-if="movieDetail">
    <div class="barrage-box">
      <div class="barrage-video">
        <!-- 弹幕 -->
        <barrage-base :barrageArr="barrageArr" :barrageShow="barrageShow" />
        <!-- 播放电影插件 -->
        <controls-video :movieDetail="movieDetail" :offLeft="offLeft"/>
      </div>

      <div class="barrage-input">
        <input
          type="text"
          placeholder="请输入您想发送的弹幕"
          class="barrageText"
          v-model="message"
          @keydown="InputKeydow($event)"
        />
        <button @click="handleClick">提交</button>
      </div>
    </div>
    <!-- 单个电影详情 -->
    <div class="movie-box">
      <ul class="movie-list">
        <li class="movie">
          <div class="movie-info-right">
            <h1>{{ movieDetail.name }}</h1>
            <p>{{ movieDetail.detail }}</p>
          </div>
        </li>
      </ul>
    </div>

    <movie-loading v-if="isLoading">加载中...</movie-loading>
  </div>
</template>

<script>
import movieServiceHttp from "../movieServiceHttp.js";
import MovieLoading from "../components/Movie/MovieLoadingResult";
import BarrageBase from "@/components/Barrage/BarrageBase";
import ControlsVideo from "@/components/Movie/ControlsVideo";
export default {
  components: {
    MovieLoading,
    BarrageBase,
    ControlsVideo
  },
  data() {
    return {
      movieDetail: null, // 单个电影详情信息
      isLoading: false,
      offLeft: 0, // 离浏览器距离
      message: "", // 输入弹幕信息
      barrageArr: [
        // {
        //   msg: '张三',
        //   speed: 7000,
        //   color: 'black',
        //   id: 1,
        //   delay: 100,
        //   top: 50,
        // },
        // {
        //   msg: '李四',
        //   speed: 4000,
        //   color: 'red',
        //   id: 2,
        //   delay: 4000,
        //   top: 100
        // },
      ],
      barrageShow: false
    };
  },
  created() {
    const id = this.$route.params.id; // 得到动态路由id
    
    this.isLoading = true;

    movieServiceHttp.getMoviesDetail(id).then(resp => {
      // 远程获取单个电影信息
      this.movieDetail = { ...resp[0] };
      console.log(this.movieDetail);
      this.isLoading = false;
    });
  },
  updated() {
    this.offLeft = document.getElementsByClassName('barrage-box')[0].offsetLeft;
  },
  methods: {
    // 点击发送弹幕
    handleClick() {
      const barrageText = this.message;
      const speed = barrageText.length > 4 ? 6000 : 10000;
      this.barrageContent = barrageText;
      if (barrageText === "" || barrageText.length == 0) {
        return;
      }
      let newMessage = {
        msg: barrageText,
        speed,
        color: `rgba(${parseInt(Math.random() * 244)},${parseInt(
          Math.random() * 244
        )},${parseInt(Math.random() * 244)},${parseInt(Math.random() * 244)})`,
        id: Math.random() * 100,
        top: Math.floor(Math.random() * 250 + 12), // 12 - 250
        delay: 0
      };
      this.barrageArr.push(newMessage);
      this.barrageShow = true;
      this.message = "";
    },
    // 确认键提交弹幕
    InputKeydow(e) {
      if (this.message == "") return;
      if (e.keyCode == 13) {
        this.handleClick();
      }
    }
  }
};
</script>

<style scoped>
.movieDetail-box {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.barrage-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 800px;
  height: 650px;
}

.barrage-box .barrage-video {
  position: relative;
  width: 800px;
  height: 600px;
  overflow: hidden;
}

.barrage-box .barrage-input {
  position: absolute;
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
}
.barrage-box .barrage-input input {
  width: 200px;
  height: 30px;
}
.barrage-box .barrage-input button {
  width: 50px;
  height: 34px;
}

.movie-box {
  display: flex;
  margin-left: 10px;
}
.movie {
  position: relative;
  width: 400px;
  margin: 10px auto;
  padding: 10px 10px 30px;
}
.movie-info-right {
  position: absolute;
  top: 0;
  height: 90%;
}
.movie-info-right h1 {
  margin: 20px 0 20px;
  font-size: 32px;
  font-weight: bold;
}
.movie p {
  width: 400px;
  line-height: 30px;
  text-indent: 16px;
  font-size: 16px;
}
</style>
