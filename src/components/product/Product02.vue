<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
      return {
        data: [{
          label: '中国文学',
          children: [{
            label: '中国古典文学',
            children: [{
              label: '唐诗三百首'
            }]
          }]
        }, {
          label: '外国文学',
          children: [{
            label: '外国现代文学',
            children: [{
              label: '钢铁是怎样炼成的'
            }]
          }, {
            label: '外国古典文学',
            children: [{
              label: '荷马史诗'
            }]
          }]
        }, {
          label: '儿童文学',
          children: [{
            label: '益智书籍',
            children: [{
              label: '如何走出迷宫'
            }]
          }, {
            label: '启示书籍',
            children: [{
              label: '名人故事'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
  methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
};
</script>

<style lang="less" scoped>
</style>