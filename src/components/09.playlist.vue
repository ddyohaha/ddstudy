<template>
  <div v-if="isShow" class="playlist-details ">
      <div class="top-wrap">
          <div class="img-wrap">
              <img :src="playlist.coverImgUrl" alt="">
          </div>
          <div class="info-wrap">
              <div class="musicplay">
                <p class="playlist">歌单</p>
                <p class="title">: {{ playlist.name}}</p>
              </div>
              
              <div class="author-wrap">
                  <img class="avatar" :src="avatarUrl" alt="">
                  <div class="name-time"> 
                    <span class="name">{{playlist.creator.nickname}}</span>
                    <span class="time">{{playlist.createTime}} 创建</span> 
                </div>
                 
              </div>
              <div class="play-wrap">
                  <span class="el-icon-caret-right"></span>
                  <span class="text">播放全部</span>
              </div>
              <div class="tab-wrap">
                  <span class="title">标签:</span>
                  <ul>
                      <li v-for="(item,index) in playlist.tags" :key="index">{{ item }} </li>
                  </ul>
              </div>
              <div class="tab-wrap">
                  <span class="title">简介: </span> 
                  <span class="desc">  {{playlist.description}}</span>
              </div>
          </div>
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
        <tr v-for="(item, index) in playlist.tracks" :key="index" class="el-table__row">
          <td>{{index + 1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.al.picUrl" alt="">
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
    
  </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'playlist',
    data() {
        return {
            activeIndex: 'songs',
            // 总条数
            total: 0,
            // 页码
            page: 1,
            // 歌单详情数据
            playlist: {},
            avatarUrl: '',
            isShow:false
        };
    },
     created(){
        axios({
            url: 'http://47.96.91.10:3000/playlist/detail',
            method: 'get',
            params: {
                id:this.$route.query.q
            }
        }).then(res => {
            console.log( res);
            this.playlist = res.data.playlist;
            this.avatarUrl = res.data.playlist.creator.avatarUrl;
            console.log('this.playlist',  this.playlist )
            this.isShow = true
        // 处理时长 毫秒 转为 分秒
        for(let i = 0; i < this.playlist.tracks.length; i++){
          let dt = this.playlist.tracks[i].dt
          let min = parseInt( dt / 1000 / 60);
          if(min < 10){
            min = '0' + min
          }
          let sec = parseInt((dt / 1000 ) % 60)
          if(sec < 10){
            sec = '0' + sec
          }
          this.playlist.tracks[i].dt = `${min}:${sec}`
        }
        })
    },
    methods: {
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
    },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }

}
</script>

<style>
 .playlist-details {
     padding: 20px;
 }
 .playlist-details .top-wrap {
     display: flex;
    
    width: 900px;
    height: 250px;
    /* background-color: rgb(184, 185, 185); */
}
 .playlist-details .top-wrap .img-wrap img{
     width: 200px;
     height: 200px;
     
 }
   .playlist-details .top-wrap .info-wrap{
       margin: 0 20px;
   }
  .playlist-details .top-wrap .info-wrap .musicplay{
      display: flex;
      margin: 10px 0;
  }
  .playlist-details .top-wrap .info-wrap .musicplay .playlist{
      padding: 0 6px;
      margin-right: 15px;
      font-weight: 800;
      font-size: 20px;
      color: rgb(76, 48, 92);
      border: 1px solid rgb(76, 48, 92);
      border-radius: 5px;
  }
 .playlist-details .top-wrap .info-wrap .musicplay .title{
     font-size: 24px;
     font-weight: 1000;
 }
 .playlist-details .top-wrap .info-wrap .author-wrap{
     display: flex;
 }
 .playlist-details .top-wrap .info-wrap .author-wrap .name-time{
    position: absolute;
    margin-top: 4px;
    margin-left: 40px;
 }
  .playlist-details .top-wrap .info-wrap .author-wrap img{
     
      border-radius: 50px;
      width: 30px;
  }
  .playlist-details .top-wrap .play-wrap .el-icon-caret-right{
    transform: scale(2,1.5);
  }
  .playlist-details .top-wrap .play-wrap{
    width: 108px;
    margin: 10px 0;
    padding: 5px 10px;
    background-color: rgb(76, 48, 92);
    border-radius: 15px;
    color: #fff;
  }
  .playlist-details .top-wrap .info-wrap .tab-wrap {
      display: flex;
      width: 100%;
  }
  .playlist-details .top-wrap .info-wrap .tab-wrap ul,.desc {
      display: flex;
      font-size: 13px;
      line-height: 24px;
      width: 93%;
  } 
  .playlist-details .top-wrap .info-wrap .tab-wrap .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .playlist-details tbody .img-wrap .el-icon-video-play{
  position: absolute;
  font-size: 28px;
  color: #fff;
  margin-left: -12px;
  margin-top: 12px;
}
.playlist-details .homeMain .el-tabs__item {
    height: 50px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    /* margin: 10px 20px; */
    color: #727171;
}
.playlist-details .homeMain .el-tabs__item:hover{
    color: #593268;
}
.playlist-details .homeMain .el-tabs__item.is-active{
    color: #593268;
}
.playlist-details .homeMain .el-tabs__active-bar{
  background: #593268;
  /* width: 30px; */
}

.playlist-details table {
  
  margin-top: 20px;
  background-color: #e2cae0;
  border-bottom: 1px solid #533151;
  border-collapse:collapse;
}

.playlist-details tbody .img-wrap img{
  width: 55px;
  height: 55px;
  margin-right: -30px;
  border-radius: 2px;
}
 .playlist-details table thead th{
  height: 50px;
  /* margin-right: 10px; */
  /* text-align: left; */
  border-bottom: 1px solid #ceaacb;
  background-color: #e2cae0;
}
.playlist-details table tbody td {
  height: 80px;
  background-color: #e2cae0;
  border-bottom: 1px solid #ceaacb;
  /* border: 0; */
}
/* table thead th,td:nth-child(2){
  width: 90px;
  text-align: center;
} */
.playlist-details table thead th:nth-child(3){
  width: 230px;
  text-align: left;
  
}
.playlist-details table thead th:nth-child(4){
  padding-left: 30px;
  text-align: left;
  width: 230px;
}
.playlist-details table thead th:nth-child(5){
  width: 230px;
  text-align: left;
}
.playlist-details table thead th,td:nth-child(6){
  text-align: center;
}
.playlist-details table thead th,td:nth-child(1){
  text-align: center;
}
.playlist-details table tbody td:nth-child(4){
  padding-left: 30px;
}
.playlist-details table tbody .song-wrap{
  width:100%;
  white-space:normal;
  word-wrap:break-word;
  word-break:break-all;
}
.playlist-details .songs-container tbody .el-icon-video-play{
  position: absolute;
  font-size: 28px;
  color: #fff;
  margin-left: -12px;
  margin-top: 12px;
  }
   .tab-wrap .title{width:7%;}        
</style>