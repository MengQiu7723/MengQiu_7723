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
        :model="bookInfo"
        :rules="bookInfoRules"
        ref="bookInfoRef"
        label-width="70px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类" prop="cid">
              <el-input v-model="bookInfo.cid"></el-input>
            </el-form-item>

            <el-form-item label="书名" prop="bookName">
              <el-input v-model="bookInfo.bookName"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
              <el-input v-model="bookInfo.author"></el-input>
            </el-form-item>

            <el-form-item label="出版社" prop="publisher">
              <el-input v-model="bookInfo.publisher"></el-input>
            </el-form-item>
            <el-form-item label="书本编号" prop="ISBN">
              <el-input v-model="bookInfo.ISBN"></el-input>
            </el-form-item>
            <el-form-item label="内容介绍" prop="introduce">
              <el-input type="textarea" v-model="bookInfo.introduce"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 上传封面 -->
            <el-upload
              action="#"
              list-type="picture-card"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :http-request="uploadHeadImg"
            >
              <img
                v-if="bookInfo.imagesUrl"
                :src="bookInfo.imagesUrl"
                class="avatar"
                alt="暂无封面"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon">封面</i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBook()">确 定</el-button>
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
      bookList: [],
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      bookInfo: {
        id: '',
        cid: '', //分类id int
        sid: '', //店铺名id int
        bookName: '', //书名',
        publisher: '', //出版社',
        author: '', //作者名称',
        price: '', //价格 float
        introduce: '', //内容介绍',
        ISBN: '', //书本编号' string
        imagesUrl: '', //书本封面（图片）',
        modifyCategory: '', //暂时用不到',
        ggct: '', //暂时用不到',
        returnGoods: '', //暂时用不到',
        invoice: '', //暂时用不到',
        promise: '', //暂时用不到',
        region: '', //发货地',
        specialOffer: '', //特价',
        imagesDetails: [
          {
            id: '',
            bid: '', //关联书本id int
            url: '', //图片 string
            judge: '', //判断详情图跟缩略图（0是详情图，1是缩略图） int
          },
        ],
        imagesThumbnails: [
          {
            id: '',
            bid: '', //关联书本id int
            url: '', //图片 string
            judge: '', //判断详情图跟缩略图（0是详情图，1是缩略图） int
          },
        ],
      },
      bookInfoRules: {},
      // 添加表单的验证规则对象
      addFormRules: {},

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {
        id: '',
        cid: '', //分类id int
        sid: '', //店铺名id int
        bookName: '', //书名',
        publisher: '', //出版社',
        author: '', //作者名称',
        price: '', //价格 float
        introduce: '', //内容介绍',
        ISBN: '', //书本编号' string
        imagesUrl: '', //书本封面（图片）',
        modifyCategory: '', //暂时用不到',
        ggct: '', //暂时用不到',
        returnGoods: '', //暂时用不到',
        invoice: '', //暂时用不到',
        promise: '', //暂时用不到',
        region: '', //发货地',
        specialOffer: '', //特价',
        imagesDetails: [
          {
            id: '',
            bid: '', //关联书本id int
            url: '', //图片 string
            judge: '', //判断详情图跟缩略图（0是详情图，1是缩略图） int
          },
        ],
        imagesThumbnails: [
          {
            id: '',
            bid: '', //关联书本id int
            url: '', //图片 string
            judge: '', //判断详情图跟缩略图（0是详情图，1是缩略图） int
          },
        ],
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

    /*     // 点击按钮，添加新用户
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
    }, */

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

    /* 
    upload组件方法
    */
    /* 
    这个可以是公共方法
    文件上传的钩子：这里做了一个文件类型判断，文件大小判断
    */
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    /* 
    文件上传成功钩子
    */
    handleAvatarSuccess(response, file, fileList) {
      this.$message.success('文件上传成功')
      this.list.push(this.imgUrl)
      console.log(this.list)
    },
    /* 
    移除文件钩子
    */
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    /* 
    点击文件时钩子
    */
    handlePictureCardPreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /* 
    主图上传
    */
    async uploadImg(val) {
      // console.log(val)
      let formdate = new FormData()
      formdate.append('file', val.file)
      const { data: res } = await this.$http.post('file/upload', formdate)
      // this.bookInfo.imagesUrl = res.data
      this.imgUrl = { name: res.data, url: res.data }
      // this.list.push(this.imgUrl)
    },
    /* 封面图 */
    async uploadHeadImg(val) {
      // console.log(val)
      let formdate = new FormData()
      formdate.append('file', val.file)
      const { data: res } = await this.$http.post('file/upload', formdate)
      this.bookInfo.imagesUrl = res.data
      // this.imgUrl = { name: res.data, url: res.data }
      // this.list.push(this.imgUrl)
    },

    async addBook() {
      const { data: res } = await this.$http.post('book/insert', this.bookInfo)
      if (res.code == 0) {
        this.$message.success(res.msg)
      }
      // 隐藏添加用户的对话框
      this.addDialogVisible = false
      // 重新获取用户列表数据
      this.getGoodsList()
    },
  },
}
</script>

<style lang="less" scoped>
.avatar {
  widows: 100%;
  height: 100%;
}
</style>
