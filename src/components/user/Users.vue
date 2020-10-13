<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList">
        <el-table-column
          label="姓名"
          prop="bookName"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="username"
        ></el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {  //获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/api/book/findAll')
      // var result = res.data;
      // console.log(result.data);

      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取用户列表失败！')
      // }

      this.userList = res.data
      console.log(res.code);
      // this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
</style>