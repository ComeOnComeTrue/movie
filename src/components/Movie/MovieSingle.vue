<template>
        <!-- 单个电影 -->
        <div class="movie-box">
            <ul class="movie-list">
                <li 
                class="movie"
                >
                 <router-link :to="'/movie/'+movieSingleData.id"><img :src="movieSingleData.imgSrc" :alt="movieSingleData.name"></router-link>
                <div class="movie-info-right">
                    <h1>
                        <router-link :to="'/movie/'+movieSingleData.id">{{ movieSingleData.name }}</router-link>
                    </h1>
                    <p>{{ movieSingleData.detail }}</p>
                </div>
                </li>
            </ul>
        </div>
</template>

<script>
export default {
    props: {
        movieSingleData: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style scoped>

.movie {
    position: relative;
    width: 1000px;
    height: 290px;
    margin: 10px auto;
    padding: 10px 10px 30px;
    border-bottom: 2px solid #999;
    border-radius: 10px;
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
    cursor: pointer;
    margin: 20px 0 20px;
    font-size: 32px;
    font-weight: bold;
}
.movie p {
    width: 500px;
    line-height: 30px;
    text-indent: 16px;
    font-size: 16px;
}
</style>