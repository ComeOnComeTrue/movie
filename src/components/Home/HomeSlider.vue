<template>
    <div class="slide-box">
      <div class="slide" @mouseenter="slideEnter" @mouseleave="slideLeave">
          <router-link
            href="#"
            v-for="item in slideData"
            :key="item.id"
            :to="'/movie/'+item.id"
          >
          <img 
            class="slide-img"
            :src="item.imgSrc" 
            :alt="item.name"  
          />
        </router-link>
      </div>

      <ul class="slideMovieName">
        <li 
          class="movieName"
          v-for="(item, index) in slideData"
          :key="item.id"
          @mouseenter="HandleNameEnter(index)"
          @mouseleave="slideLeave"
        >{{item.name}}</li>
      </ul>

    </div>
</template>

<script>
export default {
  props: {
    slideData: {
      type: Array,
    }
  },
  updated() { // 更新后，此时数据和dom同步。
    this.initMove();
    this.autoMove();
  },
  beforeDestroy() { 
    clearInterval(this.timer);
  },
  data() {
    return{
      curDisplay: 0, // 中间图片显示索引
      imgArr: document.getElementsByClassName('slide-img'),
      timer: null, // 自动轮播定时器
    }
  },
  methods: {
    HandleNameEnter(index) {
      clearInterval(this.timer);
      if(this.curDisplay == index) return;
      this.curDisplay = index;
      this.initMove();
    },
    // 图片动画效果
    initMove() {
      const imgLen = this.imgArr.length;
      const {imgArr} = this;
      let hLen = Math.floor(imgLen / 2); // 取中间图片索引
      let lNum, rNum;
      for (let i = 0; i < hLen; i++) {
        // 中间图片往后的图片处理
        lNum = (this.curDisplay + hLen + i + 1) % 7; // 当前展示图片后面索引
        imgArr[lNum].style.transform = `translateX(${-150 * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(30deg)`;
        // 中间图片往前的图片处理
        rNum = (this.curDisplay + i + 1) % imgLen; // 当前展示图片前面索引
        imgArr[rNum].style.transform = `translateX(${150 * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(-30deg)`;
      }
      // 中间图片处理
      imgArr[this.curDisplay].style.transform = 'translateZ(300px)';
    },
    // 移入图片区域清除自动轮播
    slideEnter() {
      clearInterval(this.timer);
    },
    // 移除继续自动轮播
    slideLeave() {
      this.autoMove();
    },
    // 图片自动轮播
    autoMove(){
      const imgLen = this.imgArr.length;
      this.timer = setInterval(() => {
          if (this.curDisplay == imgLen - 1) {
              this.curDisplay = 0;
          } else {
              this.curDisplay++;
          }
          this.initMove(); // 动画
      }, 2000)
    }
  }

}
</script>


<style scoped>
.slide-box{
  position: relative;
  margin: 0 auto;
  width: 1280px;
  height: 460px;
}
.slide-box .slide{
  position: relative;
  transform-style: preserve-3d;
  perspective: 800px;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right,rgba(0,0,0,1),rgba(0,0,0,0) ,rgba(0,0,0,1));
}
.slide-box .slide a {
}
.slide-box .slide img{
  /* z-index: 999; */
  position: absolute;
  left: calc(50% - 150px);
  top: calc(50% - 144px);
  border-radius: 5px;
  transition: all .5s;
  cursor: pointer;
  width: 300px;
  height: 288px;
}

.slide-box .slideMovieName{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000;
}
.slide-box .slideMovieName li {
  flex: 1;
  height: 66px;
  text-align: center;
  line-height: 66px;
  color: #fff;
}
.slide-box .slideMovieName li:hover{
  background-color: rgba(255, 255, 255, .3);
}

</style>