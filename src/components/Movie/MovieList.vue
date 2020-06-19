<template>
    <!-- 渲染电影区域 -->
    <div class="movie-box">
        <movie-single 
            v-for="item in pageMovies" 
            :movieSingleData="item"
            :key="item.name"
        />

    </div>
</template>

<script>
import MovieSingle from "@/components/Movie/MovieSingle"
export default {
    props: {
        pageMovies: {
            type: Array,
            default: () => [],
        },
    },
    components:{
        MovieSingle,
    },


}
</script>

