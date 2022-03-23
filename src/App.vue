<template>
  <div>
    <!-- 头部组件 -->
    <top></top>
    <!-- 主题组件 -->
    <index></index>
    <!-- <footer></footer> -->
  </div>
</template>

<script>
  //导入
import top from './components/01.top.vue'
import index from './components/02.index.vue'
// import footer from './components/08.footer.vue'
export default {
  //注册组件
  components:{
    top,
    index,
    // footer
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>