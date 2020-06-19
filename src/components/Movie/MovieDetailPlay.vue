<template>
  <div class="movie-wrapper">
    <div class="barrage-box">
      <div class="barrage-video">
        <video :src="movieSingleData.video" :poster="movieSingleData.imgSrc" controls autoplay></video>
        <barrage-base :barrageArr="barrageArr" :barrageShow="barrageShow" />
      </div>

      <div class="barrage-input">
        <input type="text" placeholder="请输入您想发送的弹幕" class="barrageText" v-model="message" />
        <button @click="handleClick">提交</button>
      </div>
    </div>


    <!-- 单个电影 -->
    <div class="movie-box">
      <ul class="movie-list">
        <li class="movie">
          <img :src="movieSingleData.imgSrc" alt="movieSinglemovieSingleData.name" />
          <div class="movie-info-right">
            <h1>
              {{ movieSingleData.name }}
            </h1>
            <p>{{ movieSingleData.detail }}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import BarrageBase from "@/components/Barrage/BarrageBase";
export default {
  props: {
    movieSingleData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    BarrageBase
  },
  data() {
    return {
      message: "",
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
  methods: {
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
        color: `rgba( ${parseInt(Math.random() * 244)},${parseInt(Math.random() * 244)},${parseInt(Math.random() * 244)},${parseInt(Math.random() * 244)})`,
        id: Math.random() * 100,
        top: Math.floor(Math.random() * 250 + 50), // 50 - 250
        delay: 0
      };
      this.barrageArr.push(newMessage);
      this.barrageShow = true;
      this.message = '';
    }
  }
};
</script>


<style scoped>
.movie-wrapper{
  display: flex;
  justify-content: center;
}
.movie-box{
  display: flex;
  margin-left: 10px;
}
.movie {
  position: relative;
  width: 640px;
  margin: 10px auto;
  padding: 10px 10px 30px;
}

.movie img {
  height: 300px;
}
.movie-info-right {
  position: absolute;
  left: 230px;
  top: 0;
  right: 0;
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

.barrage-box {
  position: relative;
  height: 650px;
  margin-left: 30px;
}

.barrage-box .barrage-video {
  /* overflow: hidden; */
}

.barrage-box .barrage-video video {
  width: 800px;
  height: 600px;
  background-color: #000;
}

.barrage-box .barrage-input {
  position: absolute;
  left: 50%;
  bottom: 5px;
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
</style>