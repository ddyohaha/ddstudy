<template>
  <div class="index">
      
      <!-- 左侧导航 -->
      <div class="nav">
          <ul>
              <li>
                  <router-link to="/discovery">
                  <span class="el-icon-view"></span> 发现音乐</router-link>
                  </li>
              <li>
                  <router-link to="/playlists">
                  <span class="el-icon-tickets"></span> 推荐歌单</router-link></li>
              <li>
                  <router-link to="/songs">
                  <span class="el-icon-headset"></span> 最新音乐</router-link></li>
              <li>
                  <router-link to="/mvs">
                  <span class="el-icon-video-camera"></span> 最新MV</router-link></li>
          </ul>
        
      </div>
      <!-- 右侧的容器 -->
        <div class="main">
            <!-- <discovery></discovery> -->
            <!-- 路由的出口 地址命中之后把组件显示的位置 -->
            <router-view></router-view>
        </div> 

        <!-- 播放标签 -->
        <div class="player" id="player">
            <audio :src='musicUrl' controls ></audio>
        </div>
    </div>
        
</template>

<script>
// 导入 发现音乐组件
// import discovery from '../components/03.discovery.vue'
export default {
    name: 'index',
    data() {
        return{
            musicUrl:"https://music.163.com/song/media/outer/url?id=1926450518.mp3",
           
        }
    },
    // 页面创建钩子函数中添加事件监听
   created() {
    //  this.listenerFunction()
   },
   methods: {
    handleScroll () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var offsetTop = document.querySelector('#player').offsetTop;
    if (scrollTop > offsetTop) {
        this.searchBarFixed = true
    } else {
        this.searchBarFixed = false
    }
    },
    // components:{
    //     discovery
    // }
    },
    mounted () {
    window.addEventListener('scroll', this.handleScroll)
    },
}
</script>

<style>
    li {
        list-style: none;
    }
    .index{
        /* display: flex; */
        position: relative;
        padding-top: 50px;
    }
    .nav {
        position: relative;
    }
    .nav ul li {
        height: 50px;
        line-height: 50px;
        text-align: center;
        /* padding-left: -10px; */
    }
    a {
    display: block;
    width: 250px;
    text-decoration: none;
    font-size: 13px;
    color: #fff;
    }
    .index {
        display: flex;
    }
    .index .nav {
        /* width: 350px; */
        color: #fff;
        background-color: #a88ea5;
    }
    .main {
        background-color: #e2cae0;
        /* 使用剩余的尺寸 */
        flex: 1;
    }
    /* 点击高亮的效果 */
    a.router-link-active{
        color: #821a76;
        background-color: #fff;
    }
    .index .player {
        /* display: flex; */
        position: fixed;
        width: 250px;
        height: 60px;
        left: 0;
        bottom: 0;
        z-index: 1000;
        background-color: #f1f3f4;
    }
    .index .player audio {
        /* display: flex; */
        
        width: 250px;
        /* margin-top: 400px; */
        
    }
    .suspension{
	    top: 66px;
	    z-index: 99999;
	    position: fixed;
	    border-top: 1px solid #eee;
	    width: calc(100% - 248px);
	}
    .items{
        display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }
    
</style>