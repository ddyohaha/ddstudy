<template>
  <div v-if="isShow" class="result-container">
      <div class="title-wrap">
        <h2 class="title">{{$route.query.q}}</h2>
        <span class="sub-title">找到{{count}}个结果 </span>
      </div>
      <!-- tab切换 -->
      <el-tabs v-model="activeIndex" @tab-click="" class="homeMain">
    <el-tab-pane label="歌曲" name="songs">
       <table class="el-table playlit-table" border rules=none cellspacing=0 frame=below>
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in songList" :key="index" class="el-table__row" @dblclick="playMusic(item.id)">
          <td>{{index + 1}}</td>
          <td>
            <div class="img-wrap">
              <!-- <img :src="item.al.picUrl" alt=""> -->
              <span @click="playMusic(item.id)" class="el-icon-video-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.ar[0].name }}</td>
          <td>{{ item.al.name }}</td>
          <td>{{ item.dt}}</td>
        </tr>
      </tbody>
    </table>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="lists">
      <div class="result_recommendlist">
      <div class="items" v-if="isPlaylistsShow" >
        <div class="item" v-for="(item, index) in playlists" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <span class="iconfont icon-play"></span>
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="num-wrap">
                <div class="num-mask"></div>
                <span class="el-icon-caret-right"></span> 
                <!-- 播放次数 -->
                <div class="num">
                  {{ item.playCount }}
                </div>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    </el-tab-pane>
    <el-tab-pane label="MV" name="mv">
      <div class="new-mvs">
        <div class="items" v-if="isMvsShow">
          <div class="item" v-for="(item, index) in mv" :key="index" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="">
              <span class="el-icon-video-play"></span>
              <div class="num-wrap">
                <span class="el-icon-caret-right"></span> 
                <!-- 播放次数 -->
                <div class="num">
                  {{ item.playCount }}
                </div>
              </div>
            </div>
            <div class="duration">
                  {{item.duration}}
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
    </el-tab-pane>
    
  </el-tabs>

     
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
    name: 'result',
    data(){
        return {
          //tab切换时 会改变的数据
            activeIndex: "songs",
            // 保存 查询歌曲
            songList:[],
            //保存 歌单
            playlists: [],
            // 保存mv的字段
            mv:[],
            count: 0,
            isShow:false,
            isPlaylistsShow:false,
            isMvsShow:false,
            
        }
    },
    // 生命周期钩子 created
    // (回调函数),添加之后自动执行
    // 内部可以通过this 访问到vue实例
    created(){
    axios({
      url: 'http://47.96.91.10:3000/cloudsearch',
      method: 'get',
      params:{
        keywords: this.$route.query.q,
        type: 1,
        // 获取的数据量
        limit: 10
        // area: this.area,
        // type: this.type,
        // order: this.order,
        // 数量
        // limit: this.limit,
        // 偏移值 分页(页码-1)*数量
        // offset:(this.page-1)*this.limit
      }
    }).then( res => {
      console.log(res);
      this.songList = res.data.result.songs;
      this.isShow = true;
      //处理时长 毫秒 转为 分秒
        for(let i = 0; i < this.songList.length; i++){
          let dt = this.songList[i].dt
          let min = parseInt( dt / 1000 / 60);
          if(min < 10){
            min = '0' + min
          }
          let sec = parseInt((dt / 1000 ) % 60)
          if(sec < 10){
            sec = '0' + sec
          }
          this.songList[i].dt = `${min}:${sec}`
        }
        // 保存总数
        this.count = res.data.result.songCount
      // this.list = res.data.data
      //保存总条数
      // 接口问题 投count 就赋值
      // if(res.data.count){
      //   this.total = res.data.count
      // }
      
    })
        console.log(this.$route.query.q);
    },
    //侦听器
    watch:{
      activeIndex(){
        //songs歌曲
        //list 歌单
        //mv mv
        let type = 1;
        let limit = 10
        switch (this.activeIndex) {
          case 'songs':
            type = 1;
            limit = 10
            break;
          case 'lists':
            type = 1000;
            limit = 10
            break;
          case 'mv':
            type = 1004;
            limit = 8
            break;
          default:
            break;
        }

        axios({
      url: 'http://47.96.91.10:3000/cloudsearch',
      method: 'get',
      params:{
        keywords: this.$route.query.q,
        type,
        // 获取的数据量
        limit,
        
      }
    }).then( res => {
      console.log(res);
      //获取歌曲
      if(type == 1){
        this.songList = res.data.result.songs
        //处理时长 毫秒 转为 分秒
        for(let i = 0; i < this.songList.length; i++){
          let dt = this.songList[i].dt
          let min = parseInt( dt / 1000 / 60);
          if(min < 10){
            min = '0' + min
          }
          let sec = parseInt((dt / 1000 ) % 60)
          if(sec < 10){
            sec = '0' + sec
          }
          this.songList[i].dt = `${min}:${sec}`
        }
        // 保存总数
        this.count = res.data.result.songCount
        // 获取歌单
      }else if(type == 1000){
        this.playlists = res.data.result.playlists;
        //总数
        this.count = res.data.result.playlistCount;

        this.isPlaylistsShow = true;

      }else {
        this.mv = res.data.result.mvs;
        //总数
        this.count = res.data.result.mvCount;

        this.isMvsShow = true;
        //处理时间
        for(let i = 0; i < this.mv.length; i++){
          let min = parseInt(this.mv[i].duration/1000/60);
          let sec = parseInt(this.mv[i].duration/1000%60);
          if(min<10){
            min = '0' + min
          }
          if(sec<10){
            sec = '0' + sec
          }
          this.mv[i].duration = min + ':' + sec
        }
      }
    })
      }
    },
    methods: {
      // 去mv详情页
      toMV(id){
        this.$router.push(`/mv?q=${id}`),
         location.reload()
      },
      //去歌单详情页
      toPlaylist(id){
        this.$router.push(`/playlist?q=${id}`)
      },
       playMusic(id) {
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
.result-container{
  padding: 30px;
}

/* 歌曲 */
.title-wrap{
  display: flex;
}
.title-wrap .sub-title{
  margin: 14px 8px;
  font-size: 12px;
  color: #727171;
}
.homeMain .el-tabs__item {
    height: 50px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    /* margin: 10px 20px; */
    color: #727171;
}
.homeMain .el-tabs__item:hover{
    color: #593268;
}
.homeMain .el-tabs__item.is-active{
    color: #593268;
}
.homeMain .el-tabs__active-bar{
  background: #593268;
  /* width: 30px; */
}

table {
  
  margin-top: 20px;
  background-color: #e2cae0;
  border-bottom: 1px solid #533151;
  border-collapse:collapse;
}

tbody .img-wrap img{
  width: 55px;
  height: 55px;
  margin-right: -30px;
  border-radius: 2px;
}
 table thead th{
  height: 50px;
  /* margin-right: 10px; */
  /* text-align: left; */
  border-bottom: 1px solid #ceaacb;
  background-color: #e2cae0;
}
table tbody td {
  height: 80px;
  background-color: #e2cae0;
  border-bottom: 1px solid #ceaacb;
  /* border: 0; */
}
/* table thead th,td:nth-child(2){
  width: 90px;
  text-align: center;
} */
table thead th:nth-child(3){
  width: 230px;
  text-align: left;
  
}
table thead th:nth-child(4){
  padding-left: 30px;
  text-align: left;
  width: 230px;
}
table thead th:nth-child(5){
  width: 230px;
  text-align: left;
}
table thead th,td:nth-child(6){
  text-align: center;
}
table thead th,td:nth-child(1){
  text-align: center;
}
table tbody td:nth-child(4){
  padding-left: 30px;
}
table tbody .song-wrap{
  width:100%;
  white-space:normal;
  word-wrap:break-word;
  word-break:break-all;
}
.songs-container tbody .el-icon-video-play{
  position: absolute;
  font-size: 28px;
  color: #fff;
  margin-left: -12px;
  margin-top: 12px;
  }
/* 歌单 */
.result_recommendlist {
  display: block;
  padding-bottom: 100px;
  }
.result_recommendlist .items .item {
  position: relative;
  width: 17%;
  height: 165px;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 12px;
  font-weight: 500;
}

.result_recommendlist .items .item .name {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.result_recommendlist .items .item .img-wrap {
  position: relative;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.result_recommendlist .items .item .img-wrap img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
.result_recommendlist .items .item .num-wrap{
  position: absolute;
  width: 100%;
  height: 25px;
  top: 0;
  padding-top: 5px;
  color: #fff;
  /* background-color: black;
  opacity: 0.4; */
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px 5px 0 0;
}
.result_recommendlist .items .item .el-icon-caret-right{
  position: absolute;
  margin-top: 1px;
  margin-right: 5px;
  font-size: 15px;
  transform: scale(1.4,1);
}

.result_recommendlist .items .item .num-wrap .num{
  margin-left: 15px;
}
.new-mvs {
  display: block;
  /* margin-left: 25px; */
  font-size: 12px;
  margin-top: 20px;
}
.result-container .new-mvs {
  margin-bottom: 100px;
}
.result-container .new-mvs .items .item {
  /* float: left; */
  display: flex;
  width: 20%;
  height: auto;
  margin-right: 15px;
  margin-bottom: 76px;
}
.new-mvs .items .item .duration{
  float: left;
  position: absolute;
  color: #fff;
  margin: 122px 183px;
}
.new-mvs .items .item .img-wrap img {
  width: 100%;
  height: 140px;
  border-radius: 5px;
}
.new-mvs .items .item .img-wrap .el-icon-video-play{
  
  position: absolute;
  margin-left: -135px;
  margin-top: 50px;
  font-size: 50px;
  color: #fff;
}
.new-mvs .items .item .img-wrap .num-wrap{
  display: flex;
  position: absolute;
  
  margin-top: -143px;
  margin-left: 5px;
  color: #fff;
}
.new-mvs .items .item .img-wrap .num-wrap .el-icon-caret-right{
  margin-top: 1px;
  margin-right: 5px;
  font-size: 15px;
  transform: scale(1.4,1);
}
.new-mvs .items .item .info-wrap{
  display: block;
  position: absolute;
  margin-top: 150px;
}
.new-mvs .items .item .info-wrap .name {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.new-mvs .items .item .info-wrap .singer{
  margin-top: 7px;
  color: rgb(85, 85, 85);
}
</style>