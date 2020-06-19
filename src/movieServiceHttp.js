// 浏览器方法 获取数据
export default {
    async getMovies(page, pageSize) { // 得到每页的展示数据
        let arr = await fetch('https://comeoncometrue.github.io/movie/dist/moviesData/movie.json')
            .then(resp => {

                return resp.json();
            });

        arr.forEach(ele => { // 报错403 网站不让get 让图片展示
            ele.imgSrc = 'https://images.weserv.nl/?url=' + ele.imgSrc;
        })

        return {
            total: arr.length,
            pageMovies: arr.slice(page * pageSize - pageSize, page * pageSize)
        }
    },
    async getMoviesDetail(id) { // 得到单个数据
        id = +id;
        const arr = await fetch('https://comeoncometrue.github.io/movie/dist/moviesData/movie.json')
            .then(resp => resp.json());

        arr.forEach(ele => { // 报错403 网站不让get 让图片展示
            ele.imgSrc = 'https://images.weserv.nl/?url=' + ele.imgSrc;
        })
    

        let newArr = arr.filter(ele => {
            return ele.id === id;
        });
        return newArr;
    },
    async login(loginId, loginPwd) { // 模拟登录验证，
        return new Promise(resolve => {
            setTimeout(() => {
                if (loginId === 'admin' && loginPwd === "123456") {
                    resolve({
                        loginId,
                        name: '超级会员'
                    });
                } else {
                    resolve(null);
                }
            }, 1000)
        });
    }
}