<template>
  <div>
    <!-- 主容主体信息 -->
    <el-form
      :model="bookInfo"
      :rules="bookInfoRules"
      ref="bookInfoRef"
      label-width="70px"
    >
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
        <el-input v-model="bookInfo.introduce"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-form-item> -->
    <el-upload
      action="#"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="uploadImg"
      :file-list="list"
    >
      <i class="el-icon-plus">主图</i>
    </el-upload>
    <!-- </el-form-item> -->

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button type="primary" @click="addBook()" plain>提交商品信息</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '', //弹出框的图片地址
      imgUrl: '',
      dialogVisible: false,
      list: [],
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
    }
  },
  methods: {
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
    handleAvatarSuccess(response, file, fileList) {
      this.$message.success('文件上传成功')
      this.list.push(this.imgUrl)

      console.log(this.list)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async uploadImg(val) {
      // console.log(val)
      let formdate = new FormData()
      formdate.append('file', val.file)
      const { data: res } = await this.$http.post('file/upload', formdate)
      this.bookInfo.imagesUrl = res.data
      this.imgUrl = { name: res.data, url: res.data }
      // this.list.push(this.imgUrl)
    },

    async addBook() {
      const { data: res } = await this.$http.post('book/insert', this.bookInfo)
      if (res.code == 0) {
        this.$message.success(res.msg)
      }
    },
  },
}
</script>