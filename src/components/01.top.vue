<template>
  <div class="top">
    <div class="logo">
        <img src="../assets/音乐1.png" alt="">
    </div>
      <div class="title">
        <span>WELCOME TO MUSIC WORLD</span>
      </div>
      <!-- <input class="search" type="text" v-model="inputValue" @keyup.enter="toSearch"> -->
      <div class="right-box">
        <div class="el-input el-input--small el-input--prefix">
          <!-- 搜索框 -->
          <input 
            type="text" 
            autocomplete="off"
            placeholder="搜索"
            class="el-input__inner"
            v-model="inputValue"
            @keyup.enter="toResult"
            />
            <span class="el-input__prefix">
              <i class="el-input__icon el-icon-search"></i>
            </span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      // 输入的内容
      inputValue: ''
    }
  },
  methods:{
    toResult(){
      // 非空判断
      if(this.inputValue==''){
        // alert('请输入内容')
        // 提示用户
        this.$message.warning('请输入内容')
      }else{

        //否则跳转/去搜索页 
        // this.$router.push('/result')
        //携带数据
        // this.$router.push("/result?q="+this.inputValue)
        this.$router.push(`/result?q=${this.inputValue}`)
      }
    }
  }
}
</script>

<style>
.top{  
    /* 开启弹性布局 */
    display: flex;
    height: 50px;
    align-items: center;
    background-color: #caa6c6;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1000;

}

.top .title {
  margin: 0 300px;
  
  color: rgb(65, 25, 102);
}
.top .logo img {
  width: 50px;
  height: 50px;
  margin: 0 100px;
}
.top .right-box {
  position: absolute;
  right: 0;
  margin-right: 30px;
}
</style>