<template>
  <div class="controls-box" @mouseenter="enterShowMenu" @mouseleave="leaveHideMenu">
    <video
      :src="movieDetail.video"
      :poster="movieDetail.imgSrc"
      @loadedmetadata="videoLoadedmetadata"
      @ended="videoEnded"
    ></video>
    <div class="menu">
      <!--播放菜单-->
      <div class="play" @click="handleClickPlay">{{playInnerText}}</div>
      <div class="time">{{showTimer}}/{{totalTimer}}</div>
      <div
        class="progress_bar"
        @mouseenter="barEnter"
        @mouseleave="barLeave"
        @mousedown="handleBarDown($event)"
        @mousemove="handleBarMove($event)"
        @mouseup="handleBarUp($event)"
      >
        <!--进度条-->
        <div>
          <i></i>
        </div>
      </div>
      <div class="quick-box" @mouseenter="handleQuickEnter" @mouseleave="handleQuickLeave">
        <div class="quick">{{quickText}}</div>

        <div class="quick_list" v-show="showQuickList">
          <ul>
            <li @click="quickListClick(1)">正常</li>
            <li @click="quickListClick(2)">x1.25</li>
            <li @click="quickListClick(3)">x1.5</li>
            <li @click="quickListClick(4)">x2</li>
          </ul>
        </div>
      </div>

      <div class="vol-box" @mouseenter="handleVolEnter" @mouseleave="handleVolLeave">
        <div class="vol">音量</div>
        <!--音量条-->
        <div
          class="vol-bar-box"
          v-show="showVolBar"
          @mousedown="VolBarDown($event)"
          @mousemove="VolBarMove($event)"
          @mouseup="VolBarUp($event)"
          @mouseenter="volBarEnter"
        >
          <div class="vol-bar-bottom"></div>
          <div class="vol-bar-top">
            <i></i>
          </div>
        </div>
      </div>

      <div class="full_screen" @click="fullScreen">{{fullScreenText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieDetail: {
      type: Object
    },
    offLeft: {
      type: Number
    }
  },
  data() {
    return {
      oMenu: null,
      oVideo: null,
      oProgressBar: null, // 进度条
      oBarDiv: null, // 进度条下面的div
      oBarI: null, // 进度条下面的i
      oVolBarTop: null, // 音量
      playInnerText: "播放",
      showTimer: "00:00", // 播放显示时间
      totalTimer: "00:00", // 总时间
      totalDuration: 0, // 电影总时长
      curTimer: 0, // 当前电影时长
      timer: null, // 定时器
      curBarWidht: 0, // 最新进度条宽度
      videoBarlock: false, // 视频move事件节制
      quickText: "倍速", //
      showQuickList: false, // 倍速显示
      isFullScreen: false, // 是否全屏
      showVolBar: false, // 音量显示
      volBarlock: false, // 音频move事件节制
      volBarOffTop: 560, // 音量条距离上边
      fullScreenText: "全屏" // 全屏
    };
  },
  mounted() {
    this.init(); // 初始化dom
  },
  beforeDestroy() {
    if (this.timer == null) return;
    cancelAnimationFrame(this.timer); // 清除 停止
  },
  methods: {
    init() {
      this.oMenu = document.getElementsByClassName("menu")[0];
      this.oProgressBar = document.getElementsByClassName("progress_bar")[0];
      this.oBarDiv = this.oProgressBar.getElementsByTagName("div")[0];
      this.oBarI = this.oProgressBar.getElementsByTagName("i")[0];
      this.oVideo = document.getElementsByTagName("video")[0];
      this.oVolBarTop = document.getElementsByClassName("vol-bar-top")[0];

      this.oVideo.volume = 0.7;
      this.oVolBarTop.style.height = 70 + "px";
    },
    // video事件 浏览器获取完媒体的元数据触发 初始化时间
    videoLoadedmetadata() {
      const nowTime = this.oVideo.currentTime; // 设置或返回当前时间播放位置（以秒计）
      this.totalDuration = this.oVideo.duration; // 返回当前时间的总时间（以秒计）
      const width =
        (nowTime / this.totalDuration) * this.oProgressBar.clientWidth; // 当前时间/总时间*进度条总长=进度条当前位置

      const totalMinute =
        parseInt(this.totalDuration / 60) < 10
          ? "0" + parseInt(this.totalDuration / 60)
          : parseInt(this.totalDuration / 60); // 总分
      const totalSecond =
        parseInt(this.totalDuration % 60) < 10
          ? "0" + parseInt(this.totalDuration % 60)
          : parseInt(this.totalDuration % 60); // 总秒

      this.updatashowTimer(); // 更新当前时间
      this.totalTimer = totalMinute + ":" + totalSecond;

      //进度条进度
      this.oBarDiv.style.width = width + "px";
      this.oBarI.style.left = width + "px";
    },
    // 移入显示菜单
    enterShowMenu() {
      this.oMenu.style.display = "block";
    },
    leaveHideMenu() {
      // this.oMenu.style.display= 'none';
    },
    handleClickPlay() {
      if (this.playInnerText == "播放") {
        this.playInnerText = "暂停";
        this.oVideo.play(); //播放
        this.autoTimer();
      } else {
        this.playInnerText = "播放";
        this.oVideo.pause(); //暂停
        cancelAnimationFrame(this.timer); // 清除 停止
      }
    },
    // 视频结束
    videoEnded() {
      this.playInnerText = "播放";
    },
    // 时间条移入
    barEnter(e) {
      this.oProgressBar.style.height = "8px";
      this.oProgressBar.style.top = "-8px";
      this.oBarDiv.style.height = "8px";
      this.oBarI.style.width = "18px";
      this.oBarI.style.height = "18px";
      this.oBarI.style.top = "-5px";
    },
    // 时间条移出
    barLeave() {
      this.lock = false;
      this.oProgressBar.style.height = "4px";
      this.oProgressBar.style.top = "-4px";
      this.oBarDiv.style.height = "4px";
      this.oBarI.style.width = "8px";
      this.oBarI.style.height = "8px";
      this.oBarI.style.top = "-2px";
    },
    // 点击进度条
    handleBarDown(e) {
      this.videoBarlock = true;
      // console.log(this.offLeft, document.getElementsByClassName("controls-box")[0].offsetLeft)
      //获取距离左边浏览器 正确方式 const offLeft = document.getElementsByClassName("controls-box")[0].offsetLeft;

      const location = e.clientX - this.offLeft; //鼠标点击位置
      const totalWidth = this.oProgressBar.clientWidth; // 进度条总长
      const targetTime = (location / totalWidth) * this.totalDuration; // 当前时长
      this.curBarWidht = (targetTime / this.totalDuration) * 100; // 点击之后的位置
      this.oVideo.currentTime = targetTime; // 当前时长=鼠标点击位置 / 进度条总长 * 总时间
      this.oBarDiv.style.width = this.curBarWidht + "%"; //  鼠标点击位置 = 当前时长 / 总时长 * 进度条总长
      this.oBarI.style.left = 99 + "%";
      this.updatashowTimer(); // 更新当前时间
    },
    // 移动进度条
    handleBarMove(e) {
      if (this.videoBarlock == false) return;
      //获取距离左边浏览器 正确方式 const offLeft = document.getElementsByClassName("controls-box")[0].offsetLeft;

      const totalWidth = this.oProgressBar.clientWidth; // 进度条总长
      const targetTime =
        ((e.clientX - this.offLeft) / totalWidth) * this.totalDuration; // 当前时长
      this.curBarWidht = (targetTime / this.totalDuration) * 100; // 点击之后的位置
      this.oVideo.currentTime = targetTime; // 当前时长=鼠标点击位置 / 进度条总长 * 总时间
      this.oBarDiv.style.width = this.curBarWidht + "%"; //  鼠标点击位置 = 当前时长 / 总时长 * 进度条总长
      this.oBarI.style.left = 99 + "%";
      this.updatashowTimer(); // 更新当前时间
    },
    // 鼠标松开进度条时
    handleBarUp() {
      this.videoBarlock = false;
    },
    // 电影时间自动更新
    autoTimer() {
      this.timer = requestAnimationFrame(() => {
        this.updatashowTimer();
        this.updataProgressBar();
        this.autoTimer();
      });
    },
    // 更新当前时间函数
    updatashowTimer() {
      const nowTime = this.oVideo.currentTime; // 设置或返回当前时间播放位置（以秒计）
      const total = this.oVideo.duration; // 返回当前时间的总时间（以秒计）
      const nowMinute =
        parseInt(nowTime / 60) < 10
          ? "0" + parseInt(nowTime / 60)
          : parseInt(nowTime / 60); // 当前分
      const nowSecond =
        parseInt(nowTime % 60) < 10
          ? "0" + parseInt(nowTime % 60)
          : parseInt(nowTime % 60); // 当前秒
      this.showTimer = nowMinute + ":" + nowSecond;
    },
    // 进度条自动更新函数
    updataProgressBar() {
      const n = this.oVideo.currentTime; // 设置或返回当前时间播放位置（以秒计）
      this.curBarWidht = (n / this.totalDuration) * 100; // 点击之后的位置
      this.oBarDiv.style.width = this.curBarWidht + "%"; //  鼠标点击位置 = 当前时长 / 总时长 * 进度条总长
      this.oBarI.style.left = 99 + "%";
    },
    // 倍速
    handleQuickEnter() {
      this.showQuickList = !this.showQuickList;
    },
    handleQuickLeave() {
      this.showQuickList = false;
    },
    // 选择倍速
    quickListClick(type) {
      if (type == 1) {
        //正常
        this.oVideo.playbackRate = 1; // 设置倍速的属性
        this.quickText = "正常";
      } else if (type == 2) {
        //1.25
        this.oVideo.playbackRate = 1.25;
        this.quickText = "x1.25";
      } else if (type == 3) {
        //1.5
        this.oVideo.playbackRate = 1.5;
        this.quickText = "x1.5";
      } else {
        //2
        this.oVideo.playbackRate = 2;
        this.quickText = "x2";
      }
      this.showQuickList = false;
    },
    // 音量按钮区域移入
    handleVolEnter() {
      this.showVolBar = true;
    },
    // 音量按钮区域移出
    handleVolLeave() {
      this.showVolBar = false;
      this.volBarlock = false;
    },
    // 音量区域移入
    volBarEnter() {
      this.showVolBar = true;
    },
    // 音量点击
    VolBarDown(e) {
      this.volBarlock = true;
      console.log(1);
      this.volFn(e);
    },
    // 音量移动
    VolBarMove(e) {
      if (!this.volBarlock) return;
      this.volFn(e);
    },
    // 音量松开
    VolBarUp(e) {
      this.volBarlock = false;
    },
    // 音量控制 函数封装
    volFn(e) {
      const { volBarOffTop } = this;
      const volBarBottom = document.getElementsByClassName("vol-bar-bottom")[0];
      const volTotalWidth = volBarBottom.offsetHeight; // 进度条总长
      const volLocation =
        volTotalWidth - (e.clientY - volBarOffTop) > 100
          ? 100
          : volTotalWidth - (e.clientY - volBarOffTop) < 0
          ? 0
          : volTotalWidth - (e.clientY - volBarOffTop); // 鼠标点击物体的距离
      const volHeight = (volLocation / volBarBottom.offsetHeight) * 100;
      this.oVideo.volume = volHeight / 100;
      this.oVolBarTop.style.height = volHeight + "px";
    },
    // 全屏
    fullScreen(e) {
      this.volBarOffTop = 790;

      let dom = document.documentElement;
      let oControlsBox = document.getElementsByClassName("controls-box")[0];
      if (!this.isFullScreen) {
        // 页面全屏
        if (dom.requestFullscreen) {
          dom.requestFullscreen();
        } else if (dom.webkitRequestFullScreen) {
          dom.webkitRequestFullScreen();
        }

        oControlsBox.style.position = "fixed";
        oControlsBox.style.right = "0";
        oControlsBox.style.top = "0";
        oControlsBox.style.left = "0";
        oControlsBox.style.bottom = "0";
        oControlsBox.style.zIndex = 999;
        oControlsBox.style.width =
          dom.clientWidth + "px" || document.body.clientWidth + "px";
        oControlsBox.style.height =
          dom.clientHeight + "px" || document.body.clientHeight + "px";
        this.oVideo.style.width =
          dom.clientWidth + "px" || document.body.clientWidth + "px";
        this.oVideo.style.height =
          dom.clientHeight + "px" || document.body.clientHeight + "px";

        this.isFullScreen = true;
        this.fullScreenText = "退出全屏";

        // HTMLElement.prototype.pressKey = function (code) { // 主动触发事件
        //     let evt = document.createEvent("UIEvents");
        //     evt.keyCode = code;
        //     evt.initEvent("keydown", true, true);
        //     this.dispatchEvent(evt);
        // }
        // document.body.onkeydown = function(e) {
        //     console.log(e)
        // }
        // document.body.pressKey(27); // 主动触发esc
      } else {
        // 退出全屏
        this.volBarOffTop = 560;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        oControlsBox.style.position = "absolute";
        oControlsBox.style.width = "800px";
        oControlsBox.style.height = "600px";
        this.oVideo.style.width = "800px";
        this.oVideo.style.height = "600px";
        oControlsBox.style.zIndex = 9;

        this.isFullScreen = false;
        this.fullScreenText = "全屏";
      }
    }
  }
};
</script>

<style scoped>
.controls-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  user-select: none;
}
.controls-box video {
  width: 100%;
  height: 100%;
  background-color: #000;
}

.controls-box .menu {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
}
.play {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  width: 60px;
  height: 30px;
  border: 1px solid white;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
}
.time {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 10px;
  margin-left: 120px;
}
/*进度条*/
.progress_bar {
  position: absolute;
  left: 0;
  top: -4px;
  width: 100%;
  height: 4px;
  background-color: gray;
  cursor: pointer;
}
.progress_bar div {
  position: absolute;
  left: 0;
  top: 0;
  width: 0px;
  height: 4px;
  background-color: orange;
}
.progress_bar i {
  position: absolute;
  left: 0px;
  top: -2px;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
}
/*倍速*/
.quick-box {
  position: absolute;
  left: 500px;
  top: 2px;
  width: 62px;
  height: 40px;
}
.controls-box .quick {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 30px;
  border: 1px solid white;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
.quick_list {
  position: absolute;
  left: 0;
  top: -120px;
  width: 62px;
  height: 120px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.quick_list ul li {
  position: relative;
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
  cursor: pointer;
}

.quick_list ul li:hover {
  color: green;
}

/*音量*/
.controls-box .vol-box {
  position: relative;
  top: -8px;
  left: 600px;
  width: 62px;
  height: 100%;
}
.controls-box .vol-box .vol {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: -15px;
  width: 60px;
  height: 30px;
  border: 1px solid white;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
.controls-box .vol-box .vol-bar-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -110px;
  width: 30px;
  height: 115px;
  border-radius: 20px 20px 0 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.controls-box .vol-box .vol-bar-bottom,
.controls-box .vol-box .vol-bar-top {
  position: absolute;
  left: 50%;
  bottom: 2px;
  transform: translateX(-50%);
  width: 4px;
  height: 100px;
}
.controls-box .vol-box .vol-bar-bottom {
  background-color: #fff;
}
.controls-box .vol-box .vol-bar-top {
  height: 0;
  background-color: orange;
}
.controls-box .vol-box .vol-bar-top i {
  position: absolute;
  top: -8px;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
}

/*全屏*/
.controls-box .full_screen {
  position: absolute;
  top: 50%;
  left: 700px;
  margin-top: -15px;
  padding: 0 10px;
  height: 30px;
  border: 1px solid white;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
</style>