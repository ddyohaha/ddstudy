<template>
  <div class="playlists">
    <div class="playlists-container">
      <!-- 头部 -->
      <div class="top-card">
        <div class="icon-wrap">
          <img :src="topList.coverImgUrl" alt="">
        </div>
        <div class="content-wrap">
          <div class="tag">精品歌单</div>
          <div class="title">{{ topList.name }}</div>
          <div class="info">{{ topList.description }}</div>
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="bg">
      <div class="bg-mask">
      </div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" :class="{active:tag=='全部'}" @click="tag='全部'">全部</span>
        <span class="item" :class="{active:tag=='欧美'}" @click="tag='欧美'">欧美</span>
        <span class="item" :class="{active:tag=='华语'}" @click="tag='华语'">华语</span>
        <span class="item" :class="{active:tag=='流行'}" @click="tag='流行'">流行</span>
        <span class="item" :class="{active:tag=='说唱'}" @click="tag='说唱'">说唱</span>
        <span class="item" :class="{active:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
        <span class="item" :class="{active:tag=='民谣'}" @click="tag='民谣'">民谣</span>
        <span class="item" :class="{active:tag=='电子'}" @click="tag='电子'">电子</span>
        <span class="item" :class="{active:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
        <span class="item" :class="{active:tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
        <span class="item" :class="{active:tag=='ACG'}" @click="tag='ACG'">ACG</span>
        <span class="item" :class="{active:tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
        <span class="item" :class="{active:tag=='治愈'}" @click="tag='治愈'">治愈</span>
        <span class="item" :class="{active:tag=='旅行'}" @click="tag='旅行'">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="recommendlist">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toPlaylist(item.id)"> 
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
    </div>
    <!-- 分页器 
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
    -->
    <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="page"
    :page-size="12"
    >
    </el-pagination>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  name: 'recommend',
  data() {
    return {
      //总条数
      total: 0,
      page:1,
      //顶部的推荐歌单
      topList: {},
      //歌单列表
      list: [],
      //当前选择的数据
      tag: "全部"
     };
  },
  //侦听器
  watch:{
    tag() {
    //顶部的 精品歌单
    this.topData()
    // 歌单列表
    this.listData()
    //修改页码为1
    this.page = 1
    }
  },
  created() {
    //顶部的 精品歌单
    this.topData()
    // 歌单列表
    this.listData()
  },
  methods: {
    //去歌单详情页
      toPlaylist(id){
        this.$router.push(`/playlist?q=${id}`)
      },
    //抽取的方法1 顶部的数据
    topData(){
      axios({
      url: 'http://47.96.91.10:3000/top/playlist/highquality',
      method: 'get',
      params: {
        limit: 1,
        //分类数据
        cat: this.tag
      }
    }).then(res=>{
      // console.log(res)
      this.topList = res.data.playlists[0]
    })
    },
    //抽取的方法2 列表数据
    listData(){
       axios({
      url: 'http://47.96.91.10:3000/top/playlist',
      method: 'get',
      params: {
        limit: 12,
        // 起始的值 (页码-1)*每页多少条数据
        offset: (this.page-1)*12,
        //分类数据
        cat: this.tag
      }
    }).then(res=>{
      // console.log(res)
      //保存总条数
      this.total = res.data.total
      //保存数据
      this.list = res.data.playlists
    })
    },
    //页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val
      //重新获取数据
      this.listData()
    }
  }
}
</script>

<style>
  .playlists {
    position: relative;
    width: 980px;
    padding: 20px 40px 20px 40px; 
  }
 .playlists-container .top-card{
   /* position: absolute;
   margin: auto; */
   border-radius: 5px;
   float: left;
   height: 170px;
   width: 930px;
   background-color: rgb(35, 23, 77);
   margin-right: 20px;
   margin-bottom: 20px;
   padding: 15px;


 }
 .playlists-container .top-card .icon-wrap {
   float: left;
   
 }
 .playlists-container .top-card .content-wrap {
  height: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
 }
 .playlists-container .top-card .content-wrap .tag {
   width: 90px;
   margin-bottom: 12px;
   padding: 4px;
   text-align: center;
   border: 1px solid rgb(255, 175, 3);
   border-radius: 4px;
   font-size: 14px;
   color: rgb(255, 175, 3);
 }
 .playlists-container .top-card .content-wrap .title{
   color: #fff;
 }
 .playlists-container .top-card .content-wrap .info {
   margin-top: 6px;
   line-height: 15px;
   font-size: 8px;
   color: #ccc;
 }
 .playlists-container .top-card .icon-wrap img{
   width: 140px;
   height: 140px;
   margin-right: 10px;
 } 
 .playlists .bg {
   position: absolute;
   width: 930px;
   height: 170px;
   top: 20;
   left: 40px;
   background-color: black;
   opacity: 0.2;
   -webkit-filter: blur(5px); /* Chrome, Opera */     
   -moz-filter: blur(5px);    
   -ms-filter: blur(5px);   
   filter: blur(5px);
 } 
.tab-container {
  padding-top: 50px;
}
.recommendlist {
  display: block;
  padding-bottom: 830px;
  }
.recommendlist .items .item {
  /* position: relative; */
  float: left;
  width: 200px;
  height: 200px;
  margin-top: 20px;
  margin-right: 25px;
  margin-bottom: 40px;
  font-size: 12px;
  font-weight: 500;
}

.recommendlist .items .item .name {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.recommendlist .items .item .img-wrap {
  margin-top: 20px;
  position: relative;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.recommendlist .items .item .img-wrap img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
.recommendlist .items .item .num-wrap{
  position: absolute;
  width: 200px;
  height: 25px;
  margin-top: -204px;
  padding-top: 5px;
  color: #fff;
  /* background-color: black;
  opacity: 0.4; */
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px 5px 0 0;
}
.recommendlist .items .item .el-icon-caret-right{
  position: absolute;
  margin-top: 1px;
  margin-right: 5px;
  font-size: 15px;
  transform: scale(1.4,1);
}

.recommendlist .items .item .num-wrap .num{
  margin-left: 15px;
}

.playlists .tab-container .tab-bar{
  display: block;
  /* width: 980px; */
  /* margin-left: 120px; */
  margin-top: 20px;
  color: rgb(117, 117, 117);
}
.playlists .tab-container .tab-bar span{
  margin-right: 5px;
}
.active{
  color: rgb(48, 10, 70);
}
 .el-pagination {
  margin-left: 210px;
  
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #bfa2da;
}
 .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #422b57;
      color: #bfa2da;
 }                  
</style>