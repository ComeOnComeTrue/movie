import movieServiceHttp from "@/movieServiceHttp"; // 获取电影数据


export default {
    namespaced: true, // 开启命名空间
    state: {
        pageMovies: [], // 每页的视频数据

        current: 1, // 当前页码
        pageSize: 2, // 页容量 每页显示多少条数据
        total: 0, // 数据总量 总共有多少条数据
        panelNumber: 5, // 最多显示的数字页码的数量
        loadingShow: false, // 加载中显示与隐藏

        searchRouterData: [{ // 搜索的数据 默认给个数据
            "name": "爱尔兰人",
            "imgSrc": "https://images.weserv.nl/?url=img3.doubanio.com/view/photo/s_ratio_poster/public/p2568902055.jpg",
            "detail": "2019-09-27(纽约电影节) / 2019-11-01(美国点映) / 2019-11-27(美国网络) / 罗伯特·德尼罗 / 阿尔·帕西诺 / 乔·佩西 / 安娜·帕奎因 / 杰西·普莱蒙 / 哈威·凯特尔 / 斯蒂芬·格拉汉姆 / 鲍比·坎纳瓦尔 / 杰克·休斯顿 / 阿莱卡萨·帕拉迪诺 / 凯瑟琳·纳杜奇...",
            "video": "https://vdept.bdstatic.com/36496953346a636b594d3434625a4a36/6a747a3871446a4e/7c161a01d7fdc0e46462fdf577b585afbda6dd0df223d9e49e5ee43e35fb3406c78fed50897b7392956dd63835ae369e.mp4?auth_key=1592198652-0-0-cc9bcc803f65ce1160d5598f54c095ce",
            "id" : 1
        }], 
    },
    mutations: {
        setState(state, newState = {}) {  // （state的状态，传过来的参数：默认值是对象）
            for (const prop in newState) {
                state[prop] = newState[prop]; // 重新赋值   
            }
        },
        searchRouterData(state, newData = []) {// 搜索的数据
            state.searchRouterData = [];
            for (let i = 0; i < newData.searchRouterData.length; i++) {
                // 为了显示图片
                newData.searchRouterData[i].imgSrc = 'https://images.weserv.nl/?url=' + newData.searchRouterData[i].imgSrc;
                // 更改搜索数据状态
                state.searchRouterData.push(newData.searchRouterData[i]);
            }
        }
    },
    actions: {
        fetch(context) {
            context.commit('setState', { loadingShow: true });
            // 根据当前的分页设置，获取电影数据
            movieServiceHttp.getMovies(context.state.current, context.state.pageSize).then(resp => {
                // {total: xxx, datas: xxx}
                context.commit('setState', resp); // 得到数据，调用setState重新赋值改状态
                
                context.commit('setState', { loadingShow: false });
            })
        }
    }
}