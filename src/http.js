import axios from 'axios';

// // 响应拦截器 请求成功后，拦截的data数据信息 进行包装处理

axios.interceptors.response.use(response => {

    
    if(response.config.url === "https://comeoncometrue.github.io/movie/dist/moviesData/movie.json") { // 获取本地模拟电影数据
        return response.data;
    }

})

export default axios;