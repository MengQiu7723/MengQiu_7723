<template>
  <div id="index">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>发表公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" label-width="100px" :rules="rules" :model="artData">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="artData.title"></el-input>
      </el-form-item>
      <el-form-item label="检索关键词" prop="ruxWords">
        <el-input v-model="artData.ruxWords"></el-input>
      </el-form-item>
      <el-form-item label="文章模块" prop="module">
        <el-select
          placeholder="请选择"
          v-model="artData.module"
          @change="typeChange(1, artData.module)"
        >
          <el-option
            v-for="(type, index) in consts.modules"
            :key="index"
            :label="type.val"
            :value="type.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select
          placeholder="请选择"
          v-model="artData.type"
          @change="typeChange(2, artData.type)"
        >
          <el-option
            v-for="(type, index) in consts.types"
            :key="index"
            :label="type.val"
            :value="type.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章分类" prop="classify">
        <el-select placeholder="请选择" v-model="artData.classify">
          <el-option
            v-for="(type, index) in consts.classifys"
            :key="index"
            :label="type.val"
            :value="type.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章简介" prop="summary">
        <el-input type="textarea" rows="5" v-model="artData.summary"></el-input>
        
      </el-form-item>
    </el-form>
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
                   <el-row>
            <div class="art-btn">
                <el-button type="primary" icon="search" @click="reset">重置</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" icon="search" @click="saveArt('01')">保存</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" icon="search" @click="saveArt('02')">发表</el-button>
            </div>
        </el-row>
  </div>
</template> 
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {} from "vue-quill-editor";
export default {
  data() {
    return {
      config: {
        // ueditor默认文本框大小
        initialFrameHeight: 300,
      },
      artData: {
        wordType: "1",
        content: "",
        wordContent: "",
        module: "测试一",
        type: "测试二",
        classify: "测试三",
      },
      consts: {
        modules: [],
        types: [],
        classifys: [],
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        ruxWords: [
          { required: true, message: "请输入检索关键词", trigger: "blur" },
        ],
        module: [
          { required: true, message: "请选择文章模块", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择文章类型", trigger: "blur" }],
        classify: [
          { required: true, message: "请选择文章分类", trigger: "blur" },
        ],
        summary: [
          { required: true, message: "请输入文章简介", trigger: "blur" },
        ],
      },
      content: null,
      editorOption: {},
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
     //重置数据
            reset(){
                // 基础数据重置
                this.artData = {
                    wordType: '1',
                    content: '',
                    wordContent: '',
                    module: '',
                    type: '',
                    classify: ''
                }
                                //ue重置
                this.$refs.ue.clear();
                // 重置选择的图片
                this.$refs.upload.setcropImg(this.uploadInfo.defaultSrc);
                // 上传成功状态重置
                this.uploadInfo.response = {};
            },
                        // 保存文章
            saveArt(state){
                let _this = this;
                _this.$refs['form'].validate((valid) => {
                    if (valid) {
                        _this.artData.artState = state;
                            // 文章内容
                            this.artData.content = this.$refs.ue.getContent();
                            // 文档原内容
                            this.artData.wordContent = this.$refs.ue.getContentTxt();
                            // 提交文章信息
                            this.$put("/art/add", this.artData)
                            .then(function () {
                                _this.$alert(state === '01' ? "文章保存成功" : "文章发表成功", "提示");
                                if(!_this.$route.query.key){
                                    _this.reset();
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        return false;
                    }
                });
            },
          }   
  }     
</script>  

<style scoped>
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
</style>
