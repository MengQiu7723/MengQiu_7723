<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      //  BookListID:[
      //   {
      //   id:'',
      //   name:''
      // }
      // ],
      id: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  created() {
    this.getBookTreeList();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    async getBookTreeList() {
      //get请求
      const res = await this.$http.get("booksClass/selectAllWithBooksClass");
      var result = res.data;
      console.log(res);
      console.log(result);
      if (result.code == 0) {
        this.data = result.data;
        this.BookListID = result.data.id;
      } else if (result.code == 1) {
        this.$message.error(result.msg + "，登录失败！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>