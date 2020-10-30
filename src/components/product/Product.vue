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
          <el-button type="primary" @click="addDialogVisible = true"
            >添加商品</el-button
          ></el-col
        >
      </el-row>
      <!--商品列表区域-->
      <el-table :data="bookList" border stripe>
        <el-table-column label="书本名称" prop="bookName"></el-table-column>
        <el-table-column label="书本类型" prop="booktype"></el-table-column>
        <el-table-column label="上架时间" prop="booktime"></el-table-column>
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

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加商品"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 主容主体信息 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="书本名称" prop="bookname">
          <el-input v-model="addForm.bookname"></el-input>
        </el-form-item>
        <el-form-item label="书本类型" prop="booktype">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="上架时间" prop="booktime">
          <el-input v-model="addForm.booktime"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="money">
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      bookList: [
        {
          bookName: "唐诗三百首",
          booktype: "文学",
          booktime: "2020.1.23",
          money: "9.9",
        },
      ],
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        bookname: "",
        booktype: "",
        booktime: "",
        money: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        bookname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        booktype: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~15个字符之间",
            trigger: "blur",
          },
        ],
        booktime: [
          { required: true, message: "请输入时间", trigger: "blur" },
          // { validator: checkEmail, trigger: "blur" },
        ],
        money: [
          { required: true, message: "请输入价格", trigger: "blur" },
          // { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
    };
  },

  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get("/api/book/findAll ");
      this.bookList = res.data;
      console.log(res.code);
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize + "条/页");
      this.queryInfo.pagesize = newSize;
      this.queryInfo.pagenum = 1;
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log("第" + newPage + "页");
      this.queryInfo.pagenum = newPage;
    },
    // 点击按钮，添加新用户
    addBook() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("users", this.addForm);

        if (res.code !== 2) {
          this.$message.error("添加用户失败！");
        }

        this.$message.success("添加用户成功！");
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 重新获取用户列表数据
        this.getUserList();
      });
    },
    handleClose() {},
  },
};
</script>

<style lang="less" scoped>
</style>
