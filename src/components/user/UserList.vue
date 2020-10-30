<template>
  <div class="app">
    <p>后端分页demo</p>
    <!-- 将获取到的数据进行计算 -->
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="手机" prop="mobile"></el-table-column>
    </el-table>

    <div class="tabListPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo + 1"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecord"
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
      // 个数选择器（可修改）
      pageSizes: [1, 2, 5, 10],
      // 默认显示第几页       // currentPage: 1,
      pageNo: 0,
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)       // totalCount: 1,
      totalRecord: 0,
    }
  },
  methods: {
    //get发起用户列表请求
    async getData() {
      const { data: res } = await this.$http.get('user/page', {
        params: { pageNo: this.pageNo, pageSize: this.pageSize },
      })
      console.log(res)
      // 用户列表赋值给tableData
      this.tableData = res.data.results
      // 列表数据总数totalRecord
      this.totalRecord = res.totalRecord
      //当前页码*（第几页）
      this.pageNo = res.pageNo
      //当前页要显示多少条数据
      this.pageSize = res.pageSize
    },

    // 每页显示的条数
    handleSizeChange(val) {
      console.log(val + '条/页')
      // 改变每页显示的条数
      this.pageSize = val
      console.log('每页要显示' + this.pageSize)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNo = 0
      this.getData()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageNo = val
      this.getData()
    },
  },
  created: function () {
    this.getData()
  },
}
</script>