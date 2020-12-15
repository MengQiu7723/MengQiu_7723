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
          <el-button type="primary" @click="openAddDialog" v-if="role == 1"
            >添加商品</el-button
          ></el-col
        >
      </el-row>
      <!--商品列表区域-->
      <el-table :data="bookList" border stripe :row-style="{ height: '50px' }">
        <el-table-column label="书本封面" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.imagesUrl" width="50%" height="50%" />
          </template>
        </el-table-column>
        <el-table-column label="书本名称" prop="bookName"></el-table-column>
        <el-table-column label="出版社" prop="publisher"></el-table-column>
        <el-table-column
          label="作者"
          prop="author"
          width="80"
        ></el-table-column>
        <el-table-column label="价格" prop="price" width="80"></el-table-column>
        <el-table-column
          label="内容介绍"
          prop="introduce"
          min-width="85"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="书本编号" prop="isbn"></el-table-column>

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
              @click="removeBookById(scope.row.id)"
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

    <!-- 添加书本的对话框 -->
    <el-dialog
      title="商品信息"
      :visible.sync="addDialogVisible"
      width="70%"
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
          <el-col :span="16">
            <el-form-item label="分类" prop="cid">
              <el-cascader
                v-model="bookInfo.cid"
                :options="options"
                :props="defaultProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="书名" prop="bookName">
              <el-input v-model="bookInfo.bookName"></el-input>
            </el-form-item>

            <el-form-item label="作者" prop="author">
              <el-input v-model="bookInfo.author"></el-input>
            </el-form-item>

            <el-form-item label="价格" prop="author">
              <el-input v-model="bookInfo.price"></el-input>
            </el-form-item>

            <el-form-item label="出版社" prop="publisher">
              <el-input v-model="bookInfo.publisher"></el-input>
            </el-form-item>
            <el-form-item label="书本编号" prop="isbn">
              <el-input v-model="bookInfo.isbn"></el-input>
            </el-form-item>
            <el-form-item label="内容介绍" prop="introduce">
              <el-input type="textarea" v-model="bookInfo.introduce"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="封面">
          <el-row>
            <el-col :span="4">
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
            <el-col :span="10">
              <!-- 上传封面 -->
              <template>
                <el-alert
                  title="温馨提示：点击即可修改图片，只允许上传.jpg或.png格式"
                  type="warning"
                  :closable="false"
                >
                </el-alert>
              </template>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-row>
            <el-col :span="4">
              <!-- 缩略图 -->
              <el-upload
                action="#"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="uploadImg"
                :show-file-list="false"
              >
                <!-- :file-list="bookInfo.imagesDetails" -->
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
            <el-col :span="20">
              <el-upload
                action="#"
                list-type="picture-card"
                class="eluploadUser"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="uploadImg"
                :file-list="bookInfo.imagesDetails"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addBook()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: localStorage.getItem('role'),
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
      bookList: [],

      /* 缩略图 */
      // list: [],

      //控制对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      bookInfo: {
        cid: '', //分类id int
        bookName: '', //书名',
        publisher: '', //出版社',
        author: '', //作者名称',
        price: '', //价格 float
        introduce: '', //内容介绍',
        isbn: '', //书本编号' string
        imagesUrl: '', //书本封面（图片）',
        modifyCategory: '', //暂时用不到',
        ggct: '', //暂时用不到',
        returnGoods: '', //暂时用不到',
        invoice: '', //暂时用不到',
        promise: '', //暂时用不到',
        region: '', //发货地',
        specialOffer: '', //特价',
        imagesDetails: [],
        imagesThumbnails: [],
      },
      bookInfoRules: {},
      // 添加表单的验证规则对象
      addFormRules: {},

      /* 分类 */
      options: [],
      defaultProps: {
        value: 'id',
        label: 'name',
        expandTrigger: 'hover',
        // multiple: true,
        checkStrictly: true,
      },
    }
  },
  created() {
    this.getGoodsList()
    this.getBookClassification()
  },
  methods: {
    openAddDialog() {
      this.addDialogVisible = true
      this.bookInfo = {
        cid: '', //分类id int
        bookName: '', //书名',
        publisher: '', //出版社',
        author: '', //作者名称',
        price: '', //价格 float
        introduce: '', //内容介绍',
        isbn: '', //书本编号' string
        imagesUrl: '', //书本封面（图片）',
        modifyCategory: '', //暂时用不到',
        ggct: '', //暂时用不到',
        returnGoods: '', //暂时用不到',
        invoice: '', //暂时用不到',
        promise: '', //暂时用不到',
        region: '', //发货地',
        specialOffer: '', //特价',
        imagesDetails: [],
        imagesThumbnails: [],
      }
    },
    /* 获取书藉列表 */
    async getGoodsList() {
      const { data: res } = await this.$http.get('/book/findAll')
      if (res.code == 0) {
        this.bookList = res.data
        console.log(res.data)
      } else {
        this.$message.error('请求书本列表失败')
      }
    },
    /* 获取书藉分类 */
    async getBookClassification() {
      const { data: res } = await this.$http.get(
        'booksClass/selectAllWithBooksClass'
      )
      if (res.code == 0) {
        this.options = res.data
      } else {
        this.$message.error('获取书本分类失败')
      }
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

    async showEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('/book/getById', {
        params: { id: id },
      })
      if (res.code !== 0) {
        return this.$message.error('查询用户信息失败！')
      }
      this.bookInfo = res.data
      this.addDialogVisible = true
    },
    handleClose() {
      this.addDialogVisible = false
      this.bookInfo = {
        cid: '', //分类id int
        bookName: '', //书名',
        publisher: '', //出版社',
        author: '', //作者名称',
        price: '', //价格 float
        introduce: '', //内容介绍',
        isbn: '', //书本编号' string
        imagesUrl: '', //书本封面（图片）',
        modifyCategory: '', //暂时用不到',
        ggct: '', //暂时用不到',
        returnGoods: '', //暂时用不到',
        invoice: '', //暂时用不到',
        promise: '', //暂时用不到',
        region: '', //发货地',
        specialOffer: '', //特价',
        imagesDetails: [],
        imagesThumbnails: [],
      }
    },

    /* 
    upload组件方法
    */

    /* 
    这个可以是公共方法
    文件上传的钩子：这里做了一个文件类型判断，文件大小判断
    */

    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!')
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
      // this.list.push(this.imgUrl)
      // console.log(this.list)
    },
    /* 
    移除文件钩子
    */
    handleRemove(file, fileList) {
      var length = this.bookInfo.imagesDetails.length
      var index = 0
      console.log(file, fileList)
      for (var i = 0; i < length; i++) {
        if (this.bookInfo.imagesDetails[i].uid == file.uid) {
          index = i
          break
        }
      }
      this.bookInfo.imagesDetails.splice(index, 1)
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
    缩略图
    */
    async uploadImg(val) {
      // console.log(val)
      let formdate = new FormData()
      formdate.append('file', val.file)
      const { data: res } = await this.$http.post('file/upload', formdate)
      /* 缩略图存储 */
      this.bookInfo.imagesDetails.push({ name: res.data, url: res.data })
    },
    /* 封面图 */
    async uploadHeadImg(val) {
      // console.log(val)
      let formdate = new FormData()
      formdate.append('file', val.file)
      const { data: res } = await this.$http.post('file/upload', formdate)
      /* 封面图存储 */
      this.bookInfo.imagesUrl = res.data
    },

    async addBook() {
      // this.bookInfo.cid = this.bookInfo.cid[this.bookInfo.cid.length - 1]
      if (this.bookInfo.id) {
        const { data: res } = await this.$http.post(
          'book/update',
          this.bookInfo
        )
      } else {
        const { data: res } = await this.$http.post(
          'book/insert',
          this.bookInfo
        )
      }
      // if (res.code == 0) {
      //   this.$message.success(res.msg)
      // }
      // 隐藏添加用户的对话框
      this.addDialogVisible = false
      // 重新获取用户列表数据
      this.getGoodsList()
    },
    // 根据Id删除对应的用户信息
    async removeBookById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('book/delete', {
        params: { id: id },
      })
      console.log(res)
      if (res.code !== 0) {
        return this.$message.error('删除书本失败！')
      }
      this.$message.success('删除书本成功！')
      this.getGoodsList()
    },
    handleChange(value) {
      console.log(value)
      this.bookInfo.cid = value[value.length - 1]
      console.log(this.bookInfo.cid)
    },
  },
}
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.avatar {
  widows: 100%;
  height: 100%;
}
/* 深度选择 */
/deep/ .eluploadUser > div {
  display: none;
}
/deep/ .el-table {
  .cell {
    white-space: nowrap;
  }
}
</style>
