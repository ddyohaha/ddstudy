<template>
  <div class="mvs-container">
    
    <div class="filter-wrap">
      <div class="section-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab"><span class="title" :class="{active:area=='全部'}" @click="area='全部'">全部</span></li>
          <li class="tab"><span class="title" :class="{active:area=='内地'}" @click="area='内地'">内地</span></li>
          <li class="tab"><span class="title" :class="{active:area=='港台'}" @click="area='港台'">港台</span></li>
          <li class="tab"><span class="title" :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span></li>
          <li class="tab"><span class="title" :class="{active:area=='日本'}" @click="area='日本'">日本</span></li>
          <li class="tab"><span class="title" :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span></li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul  class="tabs-wrap">
          <li class="tab"><span class="title" :class="{active:type=='全部'}" @click="type='全部'">全部</span></li>
          <li class="tab"><span class="title" :class="{active:type=='官方版'}" @click="type='官方版'">官方版</span></li>
          <li class="tab"><span class="title" :class="{active:type=='原生'}" @click="type='原生'">原生</span></li>
          <li class="tab"><span class="title" :class="{active:type=='现场版'}" @click="type='现场版'">现场版</span></li>
          <li class="tab"><span class="title" :class="{active:type=='网易出品'}" @click="type='网易出品'">网易出品</span></li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab" ><span class="title" :class="{active:order=='上升最快'} " @click="order='上升最快'">上升最快</span></li>
          <li class="tab" ><span class="title" :class="{active:order=='最热'} " @click="order='最热'">最热</span></li>
          <li class="tab" ><span class="title" :class="{active:order=='最新'} " @click="order='最新'">最新</span></li>
        </ul>
      </div>
    </div>
      <div class="new-mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index" @click="toMV(item.id)" >
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
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{item.artistName}}</div>
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
    <div>
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
    
  </div>
  
</template>

<script>
// 导入axios
import axios from 'axios';
export default {
  name: 'mvs' ,
  data(){
    return {
      total: 20,
      page: 1,
      limit: 12,
      // 地区
      area: '全部',
      // 类型
      type: '全部',
      // 排序
      order: '上升最快',
      //查询的结果
      list: []
    }
  },
  //侦听器
  watch:{
    area(){ 
      // 返回第一页
      this.page = 1;
      //获取数据
      this.getList()
    },
    type(){ 
      // 返回第一页
      this.page = 1;
      //获取数据
      this.getList()
    },
    order(){
      // 返回第一页
      this.page = 1;
      //获取数据
      this.getList()
    },
  },
  created(){
    // 获取数据
    this.getList()
    
  },
  methods: {
    // 去mv详情页
      toMV(id){
        this.$router.push(`/mv?q=${id}`),
        location.reload()
      },
    // 获取列表数据
    getList() {
      axios({
      url: 'http://47.96.91.10:3000/mv/all',
      method: 'get',
      params:{
        area: this.area,
        type: this.type,
        order: this.order,
        // 数量
        limit: this.limit,
        // 偏移值 分页(页码-1)*数量
        offset:(this.page-1)*this.limit
      }
    }).then( res => {
      console.log(res);
      this.list = res.data.data
      //保存总条数
      // 接口问题 投count 就赋值
      if(res.data.count){
        this.total = res.data.count
      }
      
    })
    },

    //页码改变的回调函数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码 重新获取数据
      this.page = val 
      this.getList()
    }
  }
}
</script>

<style>
.mvs-container{
  padding: 10px 45px;
  width: 1100px;
  height: 980px;
  /* height: 200px; */
}
.mvs-container .filter-wrap div{
  display: flex;
  align-items: center;
  /* margin-bottom: 20px; */
  font-size: 14px;
}
.mvs-container .filter-wrap div ul li{
  
  float: left;
  color: rgb(146, 146, 146);
  margin: 20px 15px ;
}
.mvs-container .filter-wrap .tabs-wrap .title{
  
  padding: 2px 10px;
}
.mvs-container .filter-wrap .tabs-wrap .active {
  /* padding: 0 20px; */
    color: #a88ea5;
    background-color: #fcf6f5;
    border-radius: 7px;
}
.new-mvs {
  display: block;
  /* margin-left: 25px; */
  font-size: 12px;
  margin-top: 20px;
}
.new-mvs .items .item {
  /* float: left; */
  display: flex;
  float: left;
  width: 230px;
  height: 240px;
  margin-right: 10px;
}
.new-mvs .items .item .img-wrap img {
  width: 100%;
  height: 160px;
  border-radius: 5px;
}
.new-mvs .items .item .img-wrap .el-icon-video-play{
  
  position: absolute;
  margin-left: -135px;
  margin-top: 55px;
  font-size: 50px;
  color: #fff;
}
.new-mvs .items .item .img-wrap .num-wrap{
  display: flex;
  position: absolute;
  
  margin-top: -165px;
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
  margin-top: 170px;
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


 .el-pagination {
  position: absolute;
  margin-top: 730px ;
  margin-left: 250px;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #bfa2da;
}
 .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #422b57;
      color: #bfa2da;
 }  
.mvs-container .filter-wrap .section-wrap,.type-wrap,.order-wrap{
  display: flex;
  
}
.mvs-container .filter-wrap .tab {
  display: block;
  margin-top: 20px;
  color: rgb(117, 117, 117);
}
.mvs-container .filter-wrap .active{
  color: rgb(48, 10, 70);
}
</style>