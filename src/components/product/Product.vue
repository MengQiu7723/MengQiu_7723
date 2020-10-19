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
      <!--商品列表区域-->
      <el-table :data="userList" border stripe>
        <el-table-column label="商品名称" prop="shopName"></el-table-column>
        <el-table-column label="商品类型" prop="shop"></el-table-column>
        <el-table-column label="上架时间" prop="shoptime"></el-table-column>
        <el-table-column label="价格" prop="money"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>

            <el-tooltip
              effect="dark"
              content="分配用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
      userList: [
        {
          shopName: "饼干",
          shop: "零食",
          shoptime: "2020.1.23",
          money: "9.9",
        },
      ],
    };
  },

  created() {
    this.getGoodsList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("/api/book/findAll ");
      this.userList = res.data;
      console.log(res.code);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
