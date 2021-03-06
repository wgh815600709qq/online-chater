import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 设置模块
import Login from '@/views/settings/login'
import Register from '@/views/settings/register'

// 主页模块
import Main from '@/views/main'
import chatRoom from '@/views/chat-room/chat-room.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: 'chat-room',
          component: chatRoom
        }
      ]
    }
  ]
})
