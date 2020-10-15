<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商家列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList()"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table
        :data="
          userList.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        border
        stripe
      >
        <!--  -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名字" prop="userName"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="手机" prop="mobile"></el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 1,
      },
      //获取的用户列表
      userList: [],
      //数据总数
      total: 0,
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
    }
  },
  created() {},
  methods: {
    async getUserList() {
      // 发送请求
      // const { data: res } = await this.$http.get('/api/book/findAll')
      // if (res.code !== 2) {
      //   return this.$message.error('获取用户列表失败！')
      // }
      const res = [
        {
          userName: 'admin',
          email: '20201013@gzs.com',
          mobile: '202010131036',
          role_name: '炒鸡管理员',
          mg_state: true,
        },
        {
          userName: 'tony',
          email: '20201013@gzs.com',
          mobile: '202010131036',
          role_name: '炒蛋管理员',
          mg_state: false,
        },
      ]
      this.userList = res
      // this.userList = res.data
      this.total = this.userList.length
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize + '条/页')
      this.queryInfo.pagesize = newSize
      this.queryInfo.pagenum = 1
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log('第' + newPage + '页')
      this.queryInfo.pagenum = newPage
    },
    // 监听 switch 开关状态的改变
    userStateChange(userinfo) {
      console.log(userinfo)
      // const {data:res} = await this.$http.put('/api/')
      // if (res.code !== 0) {
      //   userinfo.mg_state = !userinfo.mg_state
      //   return this.$message.error('更新用户状态失败')
      // }
      this.$message.success('更新用户状态成功')
    },
  },
}
</script>

<style>
</style>