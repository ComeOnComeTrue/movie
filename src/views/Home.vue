<template>
  <div class="home">
      <home-slider :slideData="slideData"/>
  </div>
</template>

<script>
import HomeSlider from "@/components/Home/HomeSlider"

export default {
  components: {
    HomeSlider
  },
  created() {
      this.$axios.get('https://comeoncometrue.github.io/movie/dist/moviesData/movie.json').then(result => {
      this.slideData = result.slice(0,7);
      this.slideData.forEach(ele => { // 报错403 网站不让get 让图片展示
          ele.imgSrc = 'https://images.weserv.nl/?url=' + ele.imgSrc;
      })
    })
  },
  data() {
      return {
      slideData: [],
      }
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
}

</style>
