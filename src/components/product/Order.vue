<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="form-container">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="订单编号">
          <el-input
            v-model="formData.deviceId"
            placeholder="订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formData.money" placeholder="订单价格"></el-input>
        </el-form-item>
        <el-form-item label="货款">
          <el-select
            :clearable="true"
            v-model="formData.goods"
            placeholder="是否付款"
          >
            <el-option label="全部" value=""></el-option>
            <el-option
              :key="item.id"
              v-for="item in goods"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货">
          <el-select
            :clearable="true"
            v-model="formData.send"
            placeholder="是否发货"
          >
            <el-option label="全部" value=""></el-option>
            <el-option
              :key="item.id"
              v-for="item in send"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
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
        </el-form-item>
        <el-form-item style="padding-left: 30px">
          <el-button type="default" @click="resetForm1('formInline')"
            >重置</el-button
          >
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-card>
        <!--订单列表数据-->
        <el-table
          :data="
            orderList.slice(
              (queryInfo.pagenum - 1) * queryInfo.pagesize,
              queryInfo.pagenum * queryInfo.pagesize
            )
          "
          border
          stripe
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column label="订单编号" prop="order_number">
          </el-table-column>
          <el-table-column label="订单价格" prop="order_price">
          </el-table-column>
          <el-table-column label="是否付款" prop="pay_status">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.pay_status === '1'"
                >已付款</el-tag
              >
              <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否发货" prop="is_send"> </el-table-column>
          <el-table-column label="下单时间" prop="create_time">
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showBox"
              ></el-button>
              <el-button
                type="success"
                size="mini"
                icon="el-icon-location"
                @click="showProgressBox"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>

      <!--地址-->
      <el-dialog
        title="修改地址"
        :visible.sync="addressVisible"
        width="50%"
        @close="addressDialogClosed"
      >
        <el-form
          ref="addressFormRef"
          :rules="addressFormRules"
          :model="addressForm"
          label-width="100px"
        >
          <el-form-item label="省市区/县" prop="address1">
            <el-cascader
              :options="cityData"
              v-model="addressForm.address1"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressVisible = false">取 消</el-button>
          <el-button type="primary" @click="addressVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!--物流进度-->
      <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
        <!--时间线-->
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import cityData from "./citydata";
const FormContainer = () => import("../product/form.vue");

export default {
  data() {
    return {
      goods: [
        {
          id: "选项一",
          name: "已付款",
        },
        {
          id: "选项二",
          name: "未付款",
        },
      ],
      send: [
        {
          id: "选项一",
          name: "已发货",
        },
        {
          id: "选项二",
          name: "未发货",
        },
      ],
      formData: {
        deviceId: "",
        money: "",
        groupId: "",
        start: "",
        end: "",
      },
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
      components: {
        FormContainer,
      },
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderList: [],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      cityData,
      progressVisible: false,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    resetForm1() {
      this.formData = {
        deviceId: "",
        money: "",
        pay: "",
        
        date: "",
      };
    },

    async getOrderList() {
      // const { data: res } = await this.$http.get("orders", {
      //   params: this.queryInfo,
      // });

      // if (res.meta.status !== 200) {
      //   return this.$message.error("获取订单列表失败! ");
      // }
      const res = [
        {
          order_number: "测试数据",
          order_price: "40",
          is_send: "是",
          create_time: "20150952",
          pay_status: "0",
        },
        {
          order_number: "测试数据1",
          order_price: "40",
          is_send: "是",
          create_time: "20150952",
          pay_status: "1",
        },
      ];
      // console.log(res);
      this.orderList = res;
      // this.userList = res.data
      this.total = this.orderList.length;
    },
    //修改地址显示
    showBox() {
      this.addressVisible = true;
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields();
    },
    showProgressBox() {
      // const {data:res} = await
      // this.$http.get()

      // if(res.meta,status !== 200){
      // return this.$message.error('获取物流进度失败！')
      this.progressInfo = this.progressVisible = true;
    },

    //方法里面
  },
  // 监听 pagesize 改变的事件
  handleSizeChange(newSize) {
    console.log(newSize + "条/页");
    this.queryInfo.pagesize = newSize;
    this.queryInfo.pagenum = 1;
  },
  // 监听 页码值 改变的事件
  handleCurrentChange(newPage) {
    console.log("第" + newPage + "页");
    this.queryInfo.pagenum = newPage;
  },
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>