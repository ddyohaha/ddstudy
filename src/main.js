import Vue from 'vue'
import App from './App'
// import router from './router'

Vue.config.productionTip = false

// 导入
import VueRouter from 'vue-router'
//use
Vue.use(VueRouter)
// 导入需要通过路由管理的组件
import discovery from './components/03.discovery.vue'
import playlists from './components/04.playlists.vue'
import songs from './components/05.songs.vue'
import mvs from './components/06.mvs.vue'
import mv from './components/10.mv.vue'
import result from './components/07.result.vue'
import playlist from './components/09.playlist.vue'
//创建路由
let router = new VueRouter({
  routes:[
    // 配置地址 和 组件的对应关系
    {
      //地址
      path: "/discovery",
      component:discovery
    },
    {
      //地址
      path: "/",
      component:discovery
    },
    {
      //地址
      path: "/playlists",
      component:playlists
    },
    {
      //地址
      path: "/playlist",
      component:playlist
    },
    {
      //地址
      path: "/songs",
      component:songs
    },
    {
      //地址
      path: "/mvs",
      component:mvs
    },
    {
      //地址
      path: "/mv",
      component:mv
    },
    {
      //地址
      path: "/result",
      component:result
    }
  ]
})
// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
//use一下
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  render: h => h(App),
  router
}).$mount('#app')
