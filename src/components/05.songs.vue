<template>
  <div class="songs-container">
    <!-- <div class="tab-bar">

      <span class="item" @click="tag=0" :class="{active:tag==0}">全部</span>
      <span class="item" @click="tag=7" :class="{active:tag==7}">华语</span>
      <span class="item" @click="tag=96" :class="{active:tag==96}">欧美</span>
      <span class="item" @click="tag=8" :class="{active:tag==8}">日本</span>
      <span class="item" @click="tag=16" :class="{active:tag==16}">韩国</span>
    </div> -->
    <!-- 底部的table      -->
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
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row">
          <td>{{index + 1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="">
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
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration}}</td>
        </tr>
      </tbody>
    </table>
    <!-- 分页器 
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
    -->
    <!-- <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="page"
    :page-size="12"
    >
    </el-pagination> -->
  </div>
</template>

<script>
//导入 axios
import axios from "axios";
export default {
  name: 'songs',
  data() {
    return {
      //歌曲列表
      lists: [],
      tag: '0'
    };
  },
  created() {
    //获取最新音乐数据
    axios({
        url: "http://47.96.91.10:3000/top/song?",
        method: "get",
        params:{
          type: this.tag,
        }
      }).then((res) => {
        console.log(res);
        this.lists = res.data.data;
        //处理时长 毫秒 转为 分秒
        for(let i = 0; i < this.lists.length; i++){
          let duration = this.lists[i].duration
          let min = parseInt( duration / 1000 / 60);
          if(min < 10){
            min = '0' + min
          }
          let sec = parseInt((duration / 1000 ) % 60)
          if(sec < 10){
            sec = '0' + sec
          }
          this.lists[i].duration = `${min}:${sec}`
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
    }
  }
}
</script>

<style>
.songs-container {
  margin: 20px;
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
</style>