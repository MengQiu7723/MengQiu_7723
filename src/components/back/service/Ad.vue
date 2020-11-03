<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加广告</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="banner">
    <el-carousel :height="bannerHeight + 'px'">
    <el-carousel-item v-for="(item,index) in img_list" :key="index">
      <img ref="bannerHeight" :src="item.path"  alt=""
     >
    </el-carousel-item>
   </el-carousel>
   </div>

    <div class="form-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" placeholder="名称搜索"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-select v-model="formInline.type" value="" placeholder="广告类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="图片" value="IMAGE"></el-option>
            <el-option label="视频" value="VIDEO"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-right:-60px">
        <el-button type="default" @click="resetForm1('ruleForm')">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row>
      <el-button type="text" @click="dialogFormVisible = true"> 添加广告 </el-button>

      <el-dialog title="广告增加" :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="广告名称" prop="name" :rules="[{required:true,message:'不能为空',trigger:'blur'}]">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="广告类型" prop="type">
      <el-select v-model="ruleForm.type" @change="selAdvertisingType" placeholder="请选择类型">
        <el-option label="图片" value="IMAGE"></el-option>
        <el-option label="视频" value="VIDEO"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item v-if="isTime" label="间隔时间(秒)" prop="interval"
        :rules="[{required: true,message:'不能为空',trigger:'blur'}]">
        <el-input type="number" v-model="ruleForm.interval"></el-input>
        </el-form-item>

        <el-form-item label="设备类型" prop="deviceTypeId">
          <el-select v-model="ruleForm.deviceTypeId" placeholder="设备类型" @change="selEquipmentType">
          </el-select>
        </el-form-item>

        <el-form-item label="广告位类型" prop="adSpaceTypeId">
          <el-select v-model="ruleForm.adSpaceTypeId" placeholder="广告位类型">
            <el-option v-for="item in advertisingSpaceType" :label="item.name" key="item"
            :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备" prop="equipment">
          <span style="cursor: pointer;" v-if="!ruleForm.deviceIds.length" @click="addEquipment=true">选择设备</span>
          <span style="cursor: pointer;" v-else @click="addEquipment=true">{{ruleForm.deviceIds.length}}个设备</span>
          <!--<div v-if="!ruleForm.equipment.length" class="el-form-item__error">-->
                <!--不能为空-->
                <!--</div>-->
        </el-form-item>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
  </el-form>
</el-dialog>
      </el-row>
      <el-table
      :data="lists"
      style="width:100%">
      <el-table-column
      prop="name"
      label="名称">
      </el-table-column>
      <el-table-column
      prop="type"
      label="类型">
      </el-table-column>
      <el-table-column
      prop="stateText"
      label="状态">
      </el-table-column>
      <el-table-column
      prop="devices"
      label="设备台数">
      </el-table-column>
      <el-table-column
      prop="right"
      label="操作">
      </el-table-column>
      </el-table>
      <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'form-container',
  data(){
    return{
      isTime:true,
      ruleForm: {
                    name: '',
                    type: 'IMAGE',
                    interval: '',
                    deviceTypeId: '',
                    adSpaceTypeId: '',
                    deviceIds: [],
                    resources: []
                },
         dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth:'120px',
      //获取走马灯图片
      img_list:[
        { path:require('../../../assets/images/book1.png')},
        { path:require('../../../assets/images/sunrise.png')},
        { path:require('../../../assets/images/book2.png')},
        { path:require('../../../assets/images/book3.png')},
        { path:require('../../../assets/images/book4.png')},
        { path:require('../../../assets/images/book5.png')}
      ],
      dialogFormVisible: false,
        bannerHeight:500,
        screenWidth:0,
        formInline:{
          name:'',
          type:''
        }
    }
  },
  components:{
    
  },
  methods:{
    setSize:function(){
      this.bannerHeight = 400 /1920 *this.screenWidth;
    },
    onSubmit(){
      this.$$emit('submit',this.formInline)
    },
    resetForm1(){
      this.formInline = {
        name:'',
        type:''
      };
      this.$emit('resetForm');
    }
  },
  mounted(){
    this.screenWidth = window.innerHeight;
    this.setSize();
    window.onreset = () =>{
      this.screenWidth = window.innerWidth;
      this.setSize();
    }
  }
};
</script>

<style lang="less" scoped>
.form-container{
  padding: 30px;
  background: #fff;
}
  img{
    width: 100%;
    height: inherit;
  }
</style>