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
    <el-dropdown class="colorBtn" trigger="click" @command="changeColor">
    <span class="el-dropdown-link" >换肤</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a" @click="change_type(a)">梦幻粉</el-dropdown-item>
 <el-dropdown-item command="b" @click="change_type(b)">天空蓝</el-dropdown-item>
 <el-dropdown-item command="c" @click="change_type(c)">雾霾灰</el-dropdown-item>
 </el-dropdown-menu>
  </el-dropdown>
  </div>
  
</template>

<script>
export default {

  data(){
    return{
      //获取走马灯图片
      img_list:[
        { path:require('../../../assets/images/book1.png')},
        { path:require('../../../assets/images/sunrise.png')},
        { path:require('../../../assets/images/book2.png')},
        { path:require('../../../assets/images/book3.png')},
        { path:require('../../../assets/images/book4.png')},
        { path:require('../../../assets/images/book5.png')}
      ],
        bannerHeight:500,
        screenWidth:0,
    }
  },
  methods:{
    changeColor(command){
      console.log(command);
      document.getElementById('home-container').className = 'theme'+command;
    },
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