<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success">添加商品</el-button></el-col
        >
      </el-row>
      <!--列表区域-->
      <el-table :data="userList">
        <el-table-column label="商品名称" prop="shopName"></el-table-column>
        <el-table-column label="商品类型" prop="shop"></el-table-column>
        <el-table-column label="上架时间" prop="shoptime"></el-table-column>
        <el-table-column label="价格" prop="money"></el-table-column>
        <el-table-column label="操作" prop="scope"></el-table-column>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
    };
  },

  created() {
    this.getGoodsList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("");
      this.userList = res.data;
      console.log(res.code);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
