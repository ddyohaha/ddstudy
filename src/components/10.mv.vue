<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <!-- 头像 -->
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="data">发布 : {{ mvInfo.publishTime }}</span>
          <span class="number">播放 :{{ mvInfo.playCount }}次</span>
          <p class="desc">
            死生契阔，“我的愿，并非执手相看泪满眼”，名为真情的传奇虽限于此，但沉吟唱罢的歌词也给故事结局写上了不一样的可能，一曲、一梦，徒叹云兮云不知。下辈子，还要在一起~{{
              mvInfo.desc
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in simiMvs"
            :key="index"
            @click="toMV(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span el-icon-video-play></span>
              <div class="num-wrap">
                <span class="el-icon-caret-right"></span>
                <span class="num">{{ item.playCount }}</span>
              </div>
              <span class="time"> {{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv地址
      url: "",
      // 相关mv
      simiMvs: [],
      // mv信息
      mvInfo: {},
      // ?头像
      icon: "",
    };
  },
  created() {
    // 获取mv播放地址
    axios({
      url: "http://47.96.91.10:3000/mv/url",
      method: "get",
      params: {
        //获取url中的id
        id: this.$route.query.q,
      },
    }).then((res) => {
      console.log(res);
      this.url = res.data.data.url;
    }),
      // 获取相关mv
      axios({
        url: "http://47.96.91.10:3000/simi/mv",
        method: "get",
        params: {
          //获取url中的id
          mvid: this.$route.query.q,
        },
      }).then((res) => {
        console.log(res);
        // 保存相关mv
        this.simiMvs = res.data.mvs;
        //处理时长 毫秒 转为 分秒
        for (let i = 0; i < this.simiMvs.length; i++) {
          let duration = this.simiMvs[i].duration;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.simiMvs[i].duration = `${min}:${sec}`;
        }
      }),
      // 获取mv 信息
      axios({
        url: "http://47.96.91.10:3000/mv/detail",
        method: "get",
        params: {
          //获取url中的id
          mvid: this.$route.query.q,
        },
      }).then((res) => {
        // console.log(res);
        // 保存相关mv
        this.mvInfo = res.data.data;
        // 获取歌手信息
        axios({
          url: "http://47.96.91.10:3000/artists",
          method: "get",
          params: {
            //获取url中的id
            id: this.mvInfo.artists[0].id,
          },
        }).then((res) => {
          // console.log(res);
          // 歌手的封面信息
          this.icon = res.data.artist.picUrl;
        });
      });
  },
  methods: {
    // 去mv详情页
    toMV(id) {
      this.$router.push(`/mv?q=${id}`), location.reload();
    },
  },
};
</script>

<style>
.mv-container {
  display: flex;

  padding: 30px;
}
h3 {
  margin-bottom: 20px;
}
.mv-container .video-wrap {
  margin-bottom: 15px;
}

.mv-container .mv-wrap .info-wrap .avatar-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 60px;
}
.mv-container .mv-wrap .info-wrap .mv-info .title {
  margin: 12px 0;
}
.mv-container .mv-wrap .info-wrap .mv-info span {
  font-size: 14px;
  color: rgb(107, 107, 107);
}
.mv-container .mv-wrap .info-wrap .mv-info .desc {
  margin-top: 20px;
  font-size: 14px;
}
.mv-container .mv-wrap .info-wrap .name {
  position: absolute;
  margin-top: -50px;
  margin-left: 80px;
}
.mv-container .mv-wrap .video-wrap video {
  width: 650px;
}
.mv-recommend {
  margin-left: 20px;
}
.mv-recommend .mvs .items {
  width: 400px;
}
.mv-recommend .mvs .items .item {
  display: flex;
  margin-top: 20px;
}
.mv-recommend .mvs .items .item .img-wrap {
  width: 180px;
}
.mv-recommend .mvs .items .item .num-wrap {
  position: absolute;
  margin-left: -1px;
  margin-top: -100px;
  color: #fff;
  font-size: 10px;
}
.mv-recommend .mvs .items .item .time {
  position: absolute;
  margin-left: -35px;
  margin-top: 85px;
  font-size: 10px;
  color: #fff;
}
.mv-recommend .mvs .items .item img {
  width: 180px;
  height: 100px;
  border-radius: 5px;
}
.mv-recommend .mvs .items .item .info-wrap {
  width: 140px;
  margin-left: 10px;
  margin-top: 7px;
}
.mv-recommend .mvs .items .item .info-wrap .singer {
  margin-top: 10px;
  font-size: 10px;
  color: rgb(110, 110, 110);
}
</style>