<template>
  <div class="demo-input-size">
     <el-input
    placeholder="请输入标题"
    suffix-icon="el-icon-edit"
    v-model="input1">
  </el-input>
  <el-input
    size="medium"
    placeholder="请输入作者"
    suffix-icon="el-icon-edit"
    v-model="input2">
  </el-input>
  <el-input
    size="small"
    placeholder="请输入来源"
    suffix-icon="el-icon-edit"
    v-model="input3">
  </el-input>
  <el-input
    size="mini"
    placeholder="请输入日期"
    suffix-icon="el-icon-edit"
    v-model="input4">
  </el-input>
    <el-card style="height: 610px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
      <div id="toolbar" slot="toolbar">
        <!--添加按钮-->
        <button class="ql-bold" title="加粗">Bold</button>
        <button class="ql-italic" title="斜体">Itatic</button>
        <button class="ql-underline" title="下划线">underline</button>
        <button class="ql-strike" title="删除线">strike</button>
        <button class="ql-blockquote" title="引用">blockquote</button>
        <button class="ql-code-block" title="代码">code</button>
        <button class="ql-header" value="1" title="标题1"></button>
        <button class="ql-header" value="2" title="标题2"></button>
        <!--添加列表-->
        <button class="qi-list" value="ordered" title="有序列表"></button>
         <button class="qi-list" value="bullet" title="无序列表"></button>
         <!--添加字体下拉列表-->
         <select class="ql-header" title="段落格式">
           <option selected>段落</option>
           <option value="1">标题1</option>
           <option value="2">标题2</option>
           <option value="3">标题3</option>
           <option value="4">标题4</option>
           <option value="5">标题5</option>
           <option value="6">标题6</option>
         </select>
         <select class="ql-size" title="字体大小">
           <option value="10px">10px</option>
           <option value="12px">12px</option>
           <option value="14px">14px</option>
           <option value="16px" selected>16px</option>
           <option value="18px">18px</option>
           <option value="20px">20px</option>
         </select>
         <select class="ql-font" title="字体">
           <option value="SimSun">宋体</option>
           <option value="SimHei">黑体</option>
           <option value="Microsoft-YaHei">微软雅黑</option>
           <option value="KaiTi">楷体</option>
           <option value="FangSong">仿宋</option>
           <option value="Arial">Arial</option>
         </select>
         <!--添加上下面按钮-->
         <select class="ql-color" value="color" title="字体颜色"></select>
         <select class="ql-background" value="background" title="背景颜色"></select>
         <select class="ql-align" value="align" title="对齐"></select>
         <button class="ql-clean"  title="还原"></button>
         <el-row>
           <el-button type="success" round>成功按钮</el-button>
         </el-row>
         <el-row>
           <el-button type="success" icon="el-icon-check" circle></el-button>
         </el-row>
      </div>
      </quill-editor>
    </el-card>
  </div>
</template>

<script>
  import {
    Quill,
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

   //引入css
   import '../../../assets/css/font.css'

   //定义字体大小
   let Size = Quill.import('attributors/style/size')
   Size.whitelist = ['10px','12px','14px','16px','18px','20px']
   Quill.register(Size,true)

   //定义字体类型
   var fonts = ['SimSun','SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif',
   '宋体','黑体']
   var Font = Quill.import('formats/font')
   Font.whitelist = fonts
   Quill.register(Font,true)

  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
        input1:'',
        input2:'',
        input3:'',
        input4:'',
        content: null,
        editorOption: {
          placeholder:"请输入",
          theme:"snow", //或者‘bubble'
          modules:{
            toolbar:{
              container:'#toolbar'
            }
          }
        }
      }
    }
  }

</script>

<style scoped>
</style>