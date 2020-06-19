<template>
    <div class="page-box">
        <a class="pager-item" :class="{'disabled' : current === 1}" @click.prevent ="changePage(1)" href="">首页</a>
        <a class="pager-item" :class="{'disabled' : current === 1}" @click="changePage(current - 1)">上一页</a>

        <ul class="page-list">
            <li 
                v-for="numbersPage in numbersPageArr"
                @click="changePage(numbersPage)"
                class="page"
                :class="{
                   'active' : numbersPage === current
                }"
                :key="numbersPage"
            >{{ numbersPage }}</li>
        </ul>

        <a class="pager-item" :class="{'disabled' : current === pageNumber}" @click="changePage(current + 1)">下一页</a>
        <a class="pager-item" :class="{'disabled' : current === pageNumber}" @click="changePage(pageNumber)">尾页</a>

        <span>
            <i>{{ current }}</i> / {{ pageNumber }}
        </span>
    </div>
</template>

<script>
export default {
    model: { // 规定v-model选项的特性与事件
        prop: 'current',// v-model="checked"绑定的特性是checked
        event: 'changePage'// 绑定的事件change
    },
    props: { // 注册传过来的属性
        current: {// 当前页码
            type: Number,
            default: 1,
        },
        pageSize: {// 页容量 每页显示多少条数据
            type: Number,
            default: 2,
        },
        total: {// 数据总量 总共有多少条数据
            type: Number,
            default: 100,
        },
        panelNumber: {// 最多显示的数字页码的数量
            type: Number,
            default: 5,
        },
        
    },
    // data() {
    //     return {
    //         current: 1, // 当前页码
    //         pageSize: 2, // 页容量 每页显示多少条数据
    //         total: 36, // 数据总量 总共有多少条数据
    //         panelNumber: 5, // 最多显示的数字页码的数量
    //     }
    // },
    computed: {
        pageNumber() { // 总页数
            return Math.ceil( this.total / this.pageSize );
        },
        numbersPageArr() { // 用于得到页码数字的数组
            // 最小的页码数字
            let min = this.current - Math.floor( this.panelNumber / 2); // 
            if (min < 1) { // 
                min = 1;
            }
            // 最大的页码数字
            let max = min + this.panelNumber - 1; // 

            if (max > this.pageNumber) {
                max = this.pageNumber;
            }
            // 1 - 5 2 - 6
            const arr = [];

            for (let i = min; i <= max; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    methods: {
        changePage (newPage) {

            if(newPage < 1){
                newPage = 1;
                return;
            }else if(newPage > this.pageNumber) {
                newPage = this.pageNumber;
                return;
            }
            
            // this.current = newPage; // 不可以直接修改组件传过来的属性，要执行单项数据流规则，所以只能触发一个事件，让父组件接收数据并修改
            this.$emit('changePage', newPage); // 抛出事件 （事件名，事件值），让父组件接收数据并修改，遵守单项数据流规则
            
        },

    }
}
</script>

<style scoped>
/* 底部 */

.page-box {
    margin-top: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 600px;
    justify-content: space-around;
    align-items: center;
}
.page-box .pager-item {
    font-weight: bold;
    color: rgb(133, 8, 235);
    border: 1px solid #666;
    padding: 5px;
    border-radius: 5px;
    background-color: #ddd;
    cursor: pointer;
}
.page-box .pager-item.disabled{
    background-color: #fff;
    color: #ddd;
}

.page-box span {
    display: inline-block;
    width: 60px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-weight: 550;
}
.page-box span i {
    display: inline-block;
    color: red;
}

.page-list {
    display: inline-block;
}
.page-list .page {
    width: 20px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border: 1px solid #ddd;
    margin: 0 10px;
    float: left;
    cursor: pointer;
    user-select: none;
}

.page-list .page.active {
    color: red;
}
</style>