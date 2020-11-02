import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import AdminUsers from '../components/user/AdminUsers.vue'
import UserList from '../components/user/UserList.vue'
import BusinessmanList from '../components/user/BusinessmanList.vue'

import Product from '../components/product/Product.vue'
import Product02 from '../components/product/Product02.vue'

import Order from '../components/product/Order.vue'

import Ad from '../components/back/service/Ad.vue'
import An from '../components/back/service/Announcement.vue'
import Skin from '../components/back/service/Skin.vue'

import Chart from '../components/back/statistics/Chart.vue'
import Rank from '../components/back/statistics/Rank.vue'

import Td from '../components/demo/TreeDemo.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/demo', component: Td },
    //后台管理系统
    {
      path: '/home', component: Home, redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/adminusers', component: AdminUsers },
        { path: '/userlist', component: UserList },
        { path: '/businessmanList', component: BusinessmanList },
        { path: '/product', component: Product },
        { path: '/product02', component: Product02 },
        { path: '/order', component: Order },
        { path: '/advertising', component: Ad },
        { path: '/announcement', component: An },
        { path: '/skin', component: Skin },
        { path: '/chart', component: Chart },
        { path: '/rank', component: Rank }
      ]
    }
  ]
})

export default router;
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   // next('/login') 强制跳转
//   // if (to.path === '/login') return next()
//   // const tokenStr = window.sessionStorage.getItem('token')
//   // if (!tokenStr) return next('/login')
//   // next()
// })


