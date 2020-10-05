import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import Users from '../components/user/Users.vue'
import Users02 from '../components/user/Users02.vue'

import Product from '../components/product/Product.vue'
import Product02 from '../components/product/Product02.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home', component: Home, redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/users02', component: Users02 },
        { path: '/product', component: Product },
        { path: '/product02', component: Product02 },
      ]
    },
  ],
});

//挂载路由守卫 没有token，做不了验证2020.09.28
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   // next('/login') 强制跳转
//   if (to.path === '/login') return next();
//   const tokenStr = window.sessionStorage.getItem('token');
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router;
