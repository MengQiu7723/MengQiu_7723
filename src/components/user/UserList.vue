<template>
  <div class="app">
    <p>前端分页demo</p>
    <!-- 将获取到的数据进行计算 -->
    <el-table
      :data="
        tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      style="width: 100%"
      border
      stripe
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="userName"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="手机" prop="mobile"></el-table-column>
      <el-table-column label="身份" prop="role_name"></el-table-column>
    </el-table>
    <div class="tabListPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 5, 10],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
    }
  },
  methods: {
    getData() {
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
      // 将数据赋值给tableData
      this.tableData = res
      // 将数据的长度赋值给totalCount
      this.totalCount = res.length
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
  },
  created: function () {
    this.getData()
  },
}
</script>