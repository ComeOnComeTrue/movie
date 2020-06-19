<template>
    <div class="movie-warpper">

    <!-- 电影区域 -->
        <movie-list :pageMovies="pageMovies" />

    <!-- 底部控制页面区域 -->
        <!-- 单项数据流 第一种方法 点击时对应获取数据，渲染数据-->
        <!-- <movie-pager 
          @changePage="handleChangePage"
          :current="current"  
          :pageSize="pageSize" 
          :total="total" 
          :panelNumber="panelNumber" 
        /> -->

        <!-- 单项数据流 第二中方法 组件上双向数据绑定之v-model -->
        <movie-pager 
            v-model="current"
            :pageSize="pageSize" 
            :total="total" 
            :panelNumber="panelNumber" 
        />
    <!-- 加载中蒙层 -->
        <movie-loading v-show="loadingShow">加载中...</movie-loading>
    </div>

</template>


<script>
import movieList from "../components/Movie/MovieList";
import moviePager from "../components/Movie/MoviePager";
// import movieServiceHttp from "../movieServiceHttp"; // 获取电影数据  在创库获取数据，
import movieLoading from "../components/Movie/MovieLoadingResult";
import { mapState } from 'vuex';

export default {
    components: {
        movieList,
        moviePager,
        movieLoading,
    },
    data() {
        return{ // 已被放到仓库管理
            // pageMoviesDatas: [], // 全部视频数据
            // pageMovies: [], // 每页的视频数据

            // current: 1, // 当前页码
            // pageSize: 2, // 页容量 每页显示多少条数据
            // total: 0, // 数据总量 总共有多少条数据
            // panelNumber: 5, // 最多显示的数字页码的数量
            // loadingShow: false, // 加载中显示与隐藏
        }
    },
    created () {
        // 获取数据,自写的模拟数据
        // this.setMovies();
        this.$store.dispatch("movie/fetch"); // 触发action, 获取数据
    },
    computed: {
        // pageMovies() { // 每页的视频数据
        //     // 0 - 2 , 2 - 4    (this.current * this.pageSize - this.pageSize, this.current * this.pageSize)
        //     return this.pageMoviesDatas.slice(this.current * this.pageSize - this.pageSize, this.current * this.pageSize);
        // }
        // 函数形式的计算属性数据改变才渲染，如果双向数据绑定，那么要写成对象形式：因为一开始就会渲染一次
        ...mapState("movie", ["pageMovies", "pageSize", "total", "panelNumber", "loadingShow"]), // 自动生成计算属性
        current: { 
            get () { // 第一次渲染触发 + 数据改变触发
                return this.$store.state.movie.current;
            },
            set (newPage) { // 数据改变触发 newVal是改变的数据
                this.$store.commit('movie/setState', { 'current' : newPage});// 更改页码, 改变创库状态
                this.$store.dispatch("movie/fetch"); // 重新获取数据
            }
        }
    },
    methods: {
        handleChangePage(newPage) { // 得到MovieList抛出的事件和参数，遵守单项数据流规则
            // this.current = newPage; // 更改页码
            // this.setMovies();  // 重新获取数据
            
            this.$store.commit('movie/setState', { 'current' : newPage});// 更改页码, 改变创库状态
            this.$store.dispatch("movie/fetch"); // 重新获取数据
        },
        // setMovies() {
        //     this.loadingShow = true;
        //     // 获取数据,自写的模拟数据，movieServiceHttp
        //     movieServiceHttp.setMovies(this.current, this.pageSize).then(resp => {
        //         this.total = resp.total; 
        //         this.pageMovies = resp.pageDatas; // 每页的数据
        //         console.log(resp)
        //         this.loadingShow = false;
        //     })
        // }

    }
    
}
</script>


<style scoped>

/*  */
.movie-warpper {
}

</style>