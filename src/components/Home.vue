<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="../assets/heima.png" alt=""> -->
        <span>35后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="250px">
        <!-- 侧边导航栏 -->
        <el-menu background-color="#314056" text-color="#FFF" router>
          <el-menu-item>
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
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 一级菜单的可选项 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              >{{ subItem.authName }}</el-menu-item
            >

            <!-- 二级菜单 
            <el-submenu :index="subItem.id+''"
                        v-for="subItem in item.children"
                        :key="subItem.id">
              二级菜单的模板区域
              <template slot="title">{{subItem.authName}}</template>
              二级菜单的可选项
              <el-menu-item index="1-4-1">{{}}</el-menu-item>
            </el-submenu>
            -->
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
export default {
  data() {
    return {
      menulist: [
        {
          id: 101,
          authName: "用户管理",
          children: [
            { id: 111, authName: "用户--", path: "users" },
            { id: 112, authName: "--管理", path: "users02" },
          ],
        },
        {
          id: 102,
          authName: "商品管理",
          children: [
            { id: 122, authName: "商品--", path: "product" },
            { id: 123, authName: "--管理", path: "product02" },
          ],
        },
        {
          id: 103,
          authName: "订单管理",
          children: [{ id: 133, authName: "订单管理的选项" }],
        },
      ],
    };
  },
  methods: {
    logout() {
      // window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  handleOpen(key, keyPath) {
    console.log(key, keyPath);
  },
  handleClose(key, keyPath) {
    console.log(key, keyPath);
  },
};
</script>

<style lang="less" scoped>
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
    span {
      margin-left: 15px;
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
