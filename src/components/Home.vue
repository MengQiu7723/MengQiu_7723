<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>35后台管理系统</span>
      </div>
      <div class="good">
        <el-button
          type="primary"
          icon="el-icon-full-screen"
          size="mini"
          @click="screen"
        ></el-button>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="250px">
        <!-- 侧边导航栏 -->
        <el-menu
          background-color="#314056"
          text-color="#FFF"
          router
          unique-opened
          :default-active="activePath"
        >
          <el-menu-item index="/welcome" @click="saveNavState('/welcome')">
            <!-- 图标 -->
            <i class="el-icon-monitor"></i>
            <!-- 文本 -->
            <span>系统首页</span>
          </el-menu-item>

          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              v-if="subItem.role == role || subItem.role == 2"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <i class="el-icon-menu"></i>
              {{ subItem.authName }}
            </el-menu-item>
            <!-- 二级菜单结束 -->
          </el-submenu>
          <!-- 一级菜单结束 -->
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'home',
  data() {
    return {
      role: localStorage.getItem('role'),
      //默认不全屏
      isFullscreen: false,
      //左侧菜单数据
      /* 0代表管理员，1代表商家，2代表管理员和商家共有部分 */
      menulist: [
        {
          id: 101,
          authName: '用户管理',
          children: [
            { id: 111, authName: '管理员列表', path: 'adminusers', role: 0 },
            { id: 112, authName: '用户列表', path: 'userlist', role: 0 },
            { id: 113, authName: '商家列表', path: 'businessmanList', role: 0 },
          ],
        },
        {
          id: 102,
          authName: '商品管理',
          children: [
            { id: 122, authName: '商品列表', path: 'product', role: 2 },
            { id: 123, authName: '商品分类', path: 'product02', role: 0 },
          ],
        },
        {
          id: 103,
          authName: '订单管理',
          children: [{ id: 133, authName: '订单列表', path: 'order', role: 2 }],
        },
        {
          id: 104,
          authName: '服务管理',
          children: [
            { id: 144, authName: '公告箮理', path: 'announcement', role: 2 },
            { id: 145, authName: '广告管理', path: 'advertising', role: 0 },
            { id: 146, authName: '皮肤管理', path: 'skin', role: 0 },
          ],
        },
        {
          id: 105,
          authName: '统计管理',
          children: [
            { id: 155, authName: '商品销售排行', path: 'rank', role: 2 },
            { id: 156, authName: '商品销售图表', path: 'chart', role: 2 },
          ],
        },
      ],
      //被激活的链接地址
      activePath: '',
      /*菜单列表图标 */
      iconsObj: {
        101: 'el-icon-user-solid',
        102: 'el-icon-s-shop',
        103: 'el-icon-tickets',
        104: 'el-icon-service',
        105: 'el-icon-s-marketing',
      },
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  /* computed: {
    evenMenulist: function () {
      return this.menulist.filter(function (number) {
        return true
      })
    },
  }, */
  methods: {
    /* 角色分配内容 start
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    },
     角色分配内容 end*/
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    screen() {
      //如果不允许进入全屏，发出不允许提示
      if (!screenfull.isEnabled) {
        this.$message('您的浏览器不能全屏')
        return false
      }
      screenfull.toggle()
      this.$message.success('全屏拉')
    },
  },
  handleOpen(key, keyPath) {
    console.log(key, keyPath)
  },
  handleClose(key, keyPath) {
    console.log(key, keyPath)
  },
}
</script>

<style lang="less" scoped>
// .good{
// margin-left: 1550px;
// }
.home-container {
  height: 100%;
}
.el-header {
  background-color: #232e41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-left: 15px;
    img {
      width: 25px;
    }
    span {
      margin-left: 5px;
    }
  }
}
.el-aside {
  background-color: #314056;
}
.el-menu {
  border-right: 0px;
}
.el-main {
  background-color: #efefef;
}
</style>
