<template>
  <div id="index">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>发表公告</el-breadcrumb-item>
    </el-breadcrumb>
<el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            :clearable="true"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
          <div class="value1">
<el-select v-model="value1" clearable placeholder="选择分类">
  <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
          </div>
          <div class="value2">
          <el-select v-model="value2" clearable placeholder="选择状态">
  <el-option
  label="正常" :value="1" />
  <el-option label="禁用" :value="0" />
    </el-option>
  </el-select>
          </div>
          <div class="input1">
            <el-input
  placeholder="请输入关键词"
  v-model="input"
  clearable>
</el-input>
          </div>
          <div class="search">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
          <div class="refresh">
          <el-button type="primary" icon="el-icon-refresh" @click="refresh">重置</el-button>
          </div>
          <div class="plus">
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
          </div>

         <el-table
         v-loading="listLoading"
         :data="lsit"
         element-loading-text="Loading"
         border
         fit
         height="100%"
         class="table-container"
         highlight-current-row
         >
         <el-table-column
         fixed
         label="ID"
         width="80"
         align="center"
         >
         <template slot-scope="scope">
           {{scope.row.id}}
         </template>
         </el-table-column>
         <el-table-column
         align="center"
         width="150"
         label="文章封面"
         >
         <template slot-scope="scope">
           <img :src="scope.row.icon" height="50">
         </template>
         </el-table-column>
         <el-table-column
         label="文章名称"
         align="center"
         >
         <template slot-scope="scope">
           {{scope.row.title}}
         </template>
         </el-table-column>
         <el-table-column
         label="文章分类"
         width="120"
         align="center"
         >
         <template slot-scope="scope">
           {{scope.row.category}}
         </template>
         </el-table-column>
         <el-table-column
         label="评论量"
         width="120"
         align="center"
         >
         <template slot-scope="scope">
           {{scope.row.comment}}
         </template>
         </el-table-column>
         <el-table-column
         label="发布时间"
         width="160"
         align="center"
         >
         <template slot-scope="scope">
           {{scope.row.created_at}}
         </template>
         </el-table-column>
         <el-table-column
         label="作者"
         width="120"
         align="center"
         >
         <template slot-scope="scope">
           {{scope.row.author}}
         </template>
         </el-table-column>
         <el-table-column
         label="状态"
         width="80"
         align="center"
         >
         <template slot-scope="scope">
           <el-switch
           :value="scope.row.status"
           :active-value="1"
           :inactive-value="0"
           @change="changeStatus($event, scope)"
           />
         </template>
         </el-table-column>
         <el-table-column
         fixed="right"
         label="操作"
         width="200"
         align="center"
         >
         <template slot-scope="scope">
           <el-button-group>
             <el-button
             type="primary"
             icon="el-icon-edit"
             size="small"
             @click="edit(scope)"
             >
             修改
             </el-button>
             <el-button
             type="danger"
             icon="el-icon-delete"
             size="mini"
             @click="del(scope)"
             >
             删除
             </el-button>
           </el-button-group>
         </template>
         </el-table-column>
         </el-table>

          <el-dialog
          :visible.sync="dialogVisible"
          destroy-on-close
          :title="dialogType === 'modify' ? '修改' : '新增'"
          >
          <el-form
          ref="dataForm"
          :model="temp"
          label-width="120px"
          label-position="right">
          <el-form-item label="文章封面">
            <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="temp.icon" :src="temp.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="文章名称">
            <el-input v-model="temp.title" placeholder="请输入文章名称" />
          </el-form-item>
          <el-form-item label="文章分类">
            <el-radio-group v-model="temp.category">
              <el-radio label="新闻" />
              <el-radio label="公告" />
              <el-radio label="动态" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章正文">
            <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
      <!-- 图片上传组件辅助-->
      <el-upload
        class="avatar-uploader"
        :action="serverUrl"
        name="img"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      ></el-upload>

      <quill-editor
        class="editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      >
      </quill-editor>
    </quill-editor>
          </el-form-item>
          <el-form-item label="阅读量">
            <el-input-number v-model="temp.read" :precision="0" :min="0" />
          </el-form-item>
          <el-form-item label="评论量">
            <el-input-number v-model="temp.comment" :precision="0" :min="0" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="temp.author" placeholder="请输入作者" />
          </el-form-item>
          <el-form-item label="用户组状态">
            <el-radio-group v-model="temp.status">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">正常</el-radio>
            </el-radio-group>
          </el-form-item>
          </el-form>
          <div class="text-right">
            <el-button type="danger" @click="dialogVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="submit">
              确定
            </el-button>
          </div>
          </el-dialog>
  </div>
</template> 
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {} from "vue-quill-editor";



const _temp = {
  icon:'',
  title:'',
  category:[],
  content:'',
  read:'',
  comment:'',
  author:'',
  status:1
}

export default {
  components:{

  },
  data() {
    return {
      listLoading:true,
      options:[{
        value:'选项1',
        label:'新闻'
      },{
        value:'选项2',
        label:'动态'
      },{
        value:'选项3',
        label:'公告'
      }],
      value1:'',
      value2:'',
      input:'',
      uploadUrl:'',
      temp:Object.assign({}, _temp),
      dialogVisible:false,
      loading:false,
date: "",
      groups: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      props:{
        value:{
          type:Boolean,
          default:false
        }
      },
      computed:{
       comment_disabled:{
         get(){
           return this.value
         },
         set(val){
           this.$emit('input',val)
         }
       }
      },
      config: {
        // ueditor默认文本框大小
        initialFrameHeight: 300,
      },
      consts: {
        modules: [],
        types: [],
        classifys: [],
      },
      content: null,
      editorOption: {},
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.temp.site_logo = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      if (!this.uploadUrl) {
        this.$message.error('请设置正确的图片上传地址!')
        return false
      }
      const isJPG = file.type === 'image/*'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('只能上传图片格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    search(){
      this.fetchData()
    },
    refresh(){
     this.value1 ={
       value1:undefined
     }
     this.date ={
       data:undefined
     }
     this.value2 ={
       value2:undefined
     }
     this.input ={
       input:undefined
     }
      this.fetchData()
    },
    fetchData(){
      this.listLoading = true
      getList(this.listQuery).then(response => { //获取api
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp(){
      this.temp = Object.assign({}, _temp)
    },
    add(){
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    submit(){
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.$message({
          message:'提交成功',
          type:'success'
        })
        this.dialogVisible = false
        this.loading = false
      }, 300)
    },
          }   
  }     
</script>  

<style  lang="scss" scoped>
.el-row .el-select {
  width: 100%;
}
.crop-demo-btn {
  position: relative;
  width: 120px;
  height: 35px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 12px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.art-btn {
  text-align: center;
  margin-top: 15px;
}
.art-btn button {
  width: 80px;
}

.value1{
  float: right;
  margin-right: 1070px;
}
.value2{
  float: right;
  margin-top: -40px;
  margin-right: 860px;
}
.input1{
  float: right;
  margin-top: -40px;
  margin-right: 650px;
}
.search{
  float: right;
  margin-right: 550px;
  margin-top: -40px;
}
.refresh{
  float: right;
  margin-right: 460px;
  margin-top: -40px;
}.plus{
  float: right;
  margin-right: 370px;
  margin-top: -40px;
}
.el-icon-plus.avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
.avatar-uploader {
  height: 128px;
  img {
    width: 128px;
    height: 128px;
  }
}

</style>
