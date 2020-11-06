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
        <el-table-column label="书本封面">
          <template slot-scope="scope">
            <img :src="scope.row.imagesUrl" width="75%" height="75%" />
          </template>
        </el-table-column>
        <el-table-column label="书本名称" prop="bookName"></el-table-column>
        <el-table-column label="出版社" prop="publisher"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="内容介绍" prop="introduce"></el-table-column>
        <el-table-column label="书本编号" prop="ISBN"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
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
        <el-form-item label="书本名称" prop="bookName">
          <el-input v-model="addForm.bookName"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="addForm.publisher"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="addForm.author"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="内容介绍" prop="introduce">
          <el-input v-model="addForm.introduce"></el-input>
        </el-form-item>
        <el-form-item label="书本编号" prop="ISBN">
          <el-input v-model="addForm.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="书本封面" prop="imagesUrl">
          <el-input v-model="addForm.imagesUrl"></el-input>
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
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="书本名称">
          <el-input v-model="editForm.bookName"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="editForm.publisher"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="editForm.author"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="内容介绍">
          <el-input v-model="editForm.introduce"></el-input>
        </el-form-item>
        <el-form-item label="书本编号">
          <el-input v-model="editForm.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="书本封面">
          <el-input v-model="editForm.imagesUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
      bookList: [
        // {
        //   id: 1,
        //   bookName: "唐诗三百首",
        //   booktype: "文学",
        //   booktime: "2020.1.23",
        //   money: "9.9",
        // },
      ],
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        bookname: '',
        booktype: '',
        booktime: '',
        money: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        /* bookname: [
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
        ], */
      },

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {
        id: 'int',
        cid: 'int //分类id',
        sid: 'int //店铺名id',
        bookName: 'string //书名',
        publisher: 'string //出版社',
        author: 'string //作者名称',
        price: 'float //价格',
        introduce: 'string //内容介绍',
        ISBN: 'string //书本编号',
        imagesUrl: 'string //书本封面（图片）',
        modifyCategory: 'string //暂时用不到',
        ggct: 'string //暂时用不到',
        returnGoods: 'string //暂时用不到',
        invoice: 'string //暂时用不到',
        promise: 'string //暂时用不到',
        region: 'string //发货地',
        specialOffer: 'string //特价',
      },
      editFormRules: {},
    }
  },

  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('/book/findAll')
      this.bookList = res.data
      console.log(res.code)
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
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
    // 点击按钮，添加新用户
    addBook() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm)

        if (res.code !== 2) {
          this.$message.error('添加用户失败！')
        }

        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    async showEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('/book/getById', {
        params: { id: id },
      })
      console.log(res)
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.post(
          '/book/update',
          this.editForm
        )
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getGoodsList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    handleClose() {},
  },
}
</script>

<style lang="less" scoped>
</style>
