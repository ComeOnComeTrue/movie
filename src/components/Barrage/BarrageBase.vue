<template>
    <div class="barrage">
        <transition-group 
            tag="ul"
            @before-enter="beforeEnter"
            @enter="enter"
            >
            <template v-if="barrageShow">
                <li
                    class="box"
                    v-for="(item, index) in barrageArr"
                    :key="item.id"
                    :data-index="index"
                >{{ item.msg }}</li>
            </template>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: {
        barrageArr: { 
            type: Array,
            default: ''
        },
        barrageShow: { 
            type: Boolean,
            default: false,
        },
    },
     data() {
    return {
      count: 0,
    };
  },
  methods: {
    beforeEnter(el) {
        const dataIndex= el.getAttribute('data-index'); // 索引
        const barrageArr = this.barrageArr[dataIndex]; // 对应数据
        el.style.left = "100%";
        el.style.top = barrageArr.top + 'px';
        el.style.color = barrageArr.color;
        barrageArr.msg.trim();
        el.style.width = barrageArr.msg.length * 25 + 'px';
    },
    enter(el, done) {
        const dataIndex= el.getAttribute('data-index'); // 索引
        const barrageArr = this.barrageArr[dataIndex]; // 对应数据
        
        setTimeout(() => {
            Velocity(el, { left: `-${el.offsetWidth}px` }, { duration: barrageArr.speed, easing: 'linear', complete: ()=>{
                el.parentNode.removeChild(el);
                this.barrageArr.splice(0,1); // 每次删除最前面的那个
            } });
        }, barrageArr.delay);

    }
  },
}
</script>

<style scoped>
.barrage {
    /* position: absolute;
    top: 0; */
    width: 100%;
    height: 60%;
    overflow: hidden;
}
.box {
  position: absolute;
  left: 0;
  z-index: 999;
  font-size: 25px;
  font-weight: bold;
}
</style>