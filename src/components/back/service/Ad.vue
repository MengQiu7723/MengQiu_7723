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
  </div>
</template>

<script>
export default {

  data(){
    return{
      img_list:[
        { path:require('../../../assets/images/book1.png')},
        { path:require('../../../assets/images/sunrise.png')},
        { path:require('../../../assets/images/book2.png')},
        { path:require('../../../assets/images/book3.png')},
        { path:require('../../../assets/images/book4.png')},
        { path:require('../../../assets/images/book5.png')}
      ],
        bannerHeight:1000,
        screenWidth:0,
    }
  },
  methods:{
    setSize:function(){
      this.bannerHeight = 400 /1920 *this.screenWidth;
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


  img{
    width: 100%;
    height: inherit;
  }
</style>