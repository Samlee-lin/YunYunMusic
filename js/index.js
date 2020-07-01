var app = new Vue({
    el:"#main",
    data:{
        // 搜索关键字
        keyword : "",
        // 获取到的音乐列表
        musiclist : [],
        // 当前歌曲id musicid
        musicid : "",
        // 歌曲url
        musicurl : "",
        // 歌曲封面图片url
        musicpic : "",
        // 是否播放
        ifplay : false,
        // 热门评论
        hotComments:[],
        // 是否展示mv页面
        ifshowmv : false,
        // mv url
        mvUrl :""

    },
    methods:{
        // 搜索歌曲 https://autumnfish.cn/search?keywords=关键字
        searchMus:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.keyword)
            .then(function(response){
                that.musiclist = response.data.result.songs;
                console.log(response.data.result.songs);
            },function(err){
                console.log("搜索歌曲出错了！");
            })
        },
        // 播放音乐
        play:function(){
            this.ifplay = true;
        },
        // 暂停音乐
        pause:function(){
            this.ifplay = false;
        },
        // 选择歌曲执行函数
        selectMus:function(id){
            // console.log(id);
            var that = this;
            // 获取歌曲url https://autumnfish.cn/song/url?id=歌曲id
            axios.get("https://autumnfish.cn/song/url?id="+id)
            .then(function(response){
                //console.log(response.data.data[0].url);
                that.musicurl = response.data.data[0].url;
                that.musicid = response.data.data[0].id;
            },function(err){
                console.log("获取歌曲url出错了！");
            })

            // 获取歌曲详情 https://autumnfish.cn/song/detail?ids=歌曲id
            axios.get("https://autumnfish.cn/song/detail?ids="+id)
            .then(function(response){
                //console.log(response.data.songs[0].al.picUrl);
                that.musicpic = response.data.songs[0].al.picUrl;
            },function(err){
                console.log("获取歌曲详情出错了！");
            })

            // 获取歌曲热门评论 https://autumnfish.cn/comment/hot?id=歌曲id&type=0
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id)
            .then(function(response){
                //console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            },function(){
                console.log("获取歌曲热门评论出错了！");       
            })

            that.ifplay = !that.ifplay;
        },
        // 点击歌曲的MV按钮，弹出MV界面
        playMv:function(mvid){
            var that = this;
            var audio = document.querySelector("#audioplayer");
            // 获取歌曲MV https://autumnfish.cn/mv/url?id=MVID
            if(mvid){
                axios.get("https://autumnfish.cn/mv/url?id="+mvid)
                .then(function(response){
                    //console.log(response.data.data.url);
                    that.mvUrl = response.data.data.url;
                    that.ifshowmv = true;  
                    that.ifplay = false; 
                    audio.pause();
                    console.log(that.ifplay);    
                },function(err){
                    console.log("获取歌曲mv出错了！");
                })
            }          
        },
        // 关闭MV播放界面
        closeMV:function(){
            this.ifshowmv = false;
            this.mvUrl = "";
        }
        
    }
})