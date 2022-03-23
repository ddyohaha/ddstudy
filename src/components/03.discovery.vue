<template>
  <div class="discovery">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="lbt" :src="item.imageUrl" alt="" />
        <!-- <h3 class="medium">{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <div>
        <h3 class="title">推荐歌单</h3>
      </div>

      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <!-- <div class="desc-wrap">
                <span class="desc-wrap">{{ item.copywriter }}</span>
              </div> -->
              <span class="iconfont icon-play"></span>
            <img :src="item.coverImgUrl" alt="" />
            
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <div class="title">
        <h3>最新音乐</h3>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <span @click="playMusic(item.id)"  class="el-icon-video-play"></span>
            <img :src="item.picUrl" alt="" />
            
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="title">
        <h3>推荐MV</h3>
      </div>
        
        <div class="items">
          <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.picUrl" alt="">
              <span class="el-icon-video-play"></span>
              <div class="num-wrap">
                <span class="el-icon-caret-right"></span> 
                <!-- 播放次数 -->
                <div class="num">
                  {{ item.playCount }}
                </div>
              </div>
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
     
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
export default {
  name: "discovery",
  data() {
    return {
      //轮播图
      banners: [],
      //推荐歌单
      list: [],
      //推荐音乐
      songs: [],
      //推荐mv
      mvs: []
    };
  },
  created() {
    // console.log('created');
    //轮播图
    axios({
      url: "https://netease-music-api.fe-mm.com/banner",
      method: "get",
    }).then((res) => {
      // console.log(res);
      this.banners = res.data.banners;
    }),
    //推荐歌单
      axios({
        url: "http://47.96.91.10:3000/top/playlist?limit=10&offset=0",
        method: "get",
        // params:{}
      }).then((res) => {
        // console.log(res);
        this.list = res.data.playlists;
      }),
      //最新音乐
      axios({
        url: "https://netease-music-api.fe-mm.com/personalized/newsong",
        method: "get",
        // params:{}
      }).then((res) => {
        this.songs = res.data.result;
        // console.log(res);
      }),
      //最新mv
      axios({
        url: "https://autumnfish.cn/personalized/mv",
        method: "get",
        // params:{}
      }).then((res) => {
        this.mvs = res.data.result
      })
      ;

  },
  methods:{
    // 去mv详情页
      toMV(id){
        this.$router.push(`/mv?q=${id}`),
        location.reload()
      },
    //去歌单详情页
      toPlaylist(id){
        this.$router.push(`/playlist?q=${id}`)
      },
    playMusic(id){
      // console.log(id);
      axios({
        url:'http://47.96.91.10:3000/song/url',
        method:'get',
        params:{
          id,
        }
      }).then(res=>{
        console.log(res);
        // let url = res;
        // console.log(this.$parent.musicUrl);
        
        let url = res.data.data[0].url;
        // 设置给父组件的播放地址
        this.$parent.musicUrl = url;
      })
    }
  }
}
</script>

<style>
* {
  outline: none;
  box-sizing: border-box;
}
h3 {
  /* float: left; */
  margin-bottom: 20px;
  /* margin-left: -1400px; */
  font-size: 20px;
}
.discovery {
  width: 980px;
}
.el-carousel {
  text-align: center;
  /* position: relative; */
  margin-left: 20px;
  margin-top: 50px;
}
.el-carousel-item {
  /* position: absolute; */
  padding-left: 50px;
}
.lbt {
  width: 450px;
  height: 200px;
  /* padding-left: 30px; */
  border-radius: 20px;
}

.recommend {
  display: block;
  margin-left: 25px;
}
.recommend .items .item {
  /* position: relative; */
  float: left;
  width: 175px;
  height: 175px;
  margin-right: 20px;
  margin-bottom: 40px;
  font-size: 12px;
  font-weight: 500;
}
.recommend .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.recommend .items .item .img-wrap {
  position: relative;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.recommend .items .item .img-wrap img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
.recommend .items .item:nth-child(5){
  margin-right: 0;
}
.recommend .items .item:nth-child(10){
  margin-right: 0;
}

.news {
  display: block;
  margin-left: 25px;
  font-size: 12px;
}
.news .items .item {
  float: left;
  width: 400px;
  height: 90px;
  margin-right: 68px;
  margin-bottom: 20px;
}
.news .items .item .img-wrap img {
  float: left;
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
.news .items .item .img-wrap .el-icon-video-play{
  content: '';
  /* display: none;  */
  position: absolute;
  color: #fff;
  background: rgba(0, 0, 0, .2);
  padding: 20px;
  font-size: 40px;
}
.news .items .item .song-wrap {
  margin-left: 90px;
}
.news .items .item .song-wrap .song-name {
  margin-top: 10px;
  margin-bottom: 20px;
}
.news .items .item .song-wrap .singer{
  color: rgb(85, 85, 85);
}
.mvs {
  display: block;
  margin-left: 25px;
  font-size: 12px;
}
/* .mvs .title {
  position: absolute;

} */
.mvs .items .item {
  float: left;
  width: 230px;
  margin-right: 10px;
}
.mvs .items .item .img-wrap img {
  width: 230px;
  height: 165px;
  border-radius: 5px;
}
.mvs .items .item:last-child{
  margin-right: 0;
}
.mvs .items .item .img-wrap .el-icon-video-play{

  position: absolute;
  margin-left: -135px;
  margin-top: 55px;
  font-size: 50px;
  color: #fff;
}
.mvs .items .item .img-wrap .num-wrap{
  display: flex;
  position: absolute;
  
  margin-top: -165px;
  margin-left: 178px;
  color: #fff;
}
.mvs .items .item .img-wrap .num-wrap .el-icon-caret-right{
  margin-top: 1px;
  margin-right: 5px;
  font-size: 15px;
  transform: scale(1.4,1);
}
.mvs .items .item .info-wrap .singer{
  margin-top: 7px;
  color: rgb(85, 85, 85);
}
</style>