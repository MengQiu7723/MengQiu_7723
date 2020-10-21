<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售图表</el-breadcrumb-item>
      <el-breadcrumb-item>销售数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
 import echarts from 'echarts'

export default {
  data() {
    return {}
  },
  created() {},
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
     var myChart = echarts.init(document.getElementById('main'))

    //获取接口
    // const {data:res} = await this.$http.get('')
    // if(res.meta.status !== 200){
    //  return this.$message.error('获取失败')
    // }

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '卖书的',
      },
      tooltip: {
        trigger: 'axios',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#E9EEF3',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['这种书', '那种书', '这些书', '那些书', '这本书', '那本书'],
        boundaryGap: false,
      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    }

    myChart.setOption(option) //(res.data)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
</style>