<template>
  <div>
    <!-- 表头
    <el-row
      style="width: 945px; min-height: 36px; background: #ccc"
      type="flex"
      align="middle"
    >
      <el-col :span="8">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </el-col>
      <el-col :span="16">
        <el-row type="flex" align="middle">
          <el-col align="middle"> <span>单价</span></el-col>
          <el-col align="middle"> <span>数量</span></el-col>
          <el-col align="middle"> <span>总额</span></el-col>
          <el-col align="middle"> <span>操作</span></el-col>
        </el-row>
      </el-col>
    </el-row>
    START
    <div v-for="(index, i) in tableData" :key="index.i">
      <el-row>
        <el-col :span="24">
          <el-checkbox-group
            v-model="checkedShops"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox class="sellerName" :label="i" :key="i"
              >店铺：{{ i }}</el-checkbox
            >
          </el-checkbox-group>
        </el-col>
      </el-row>
      <div v-for="subIndex of index" :key="subIndex.id">
        <el-row
          style="width: 945px; min-height: 150px; border: 1px solid #e5e5e5"
          type="flex"
          align="middle"
        >
          <el-col :span="8">
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="1" :offset="1" align="middle">
                每个商品前的选择框
                <el-checkbox :key="subIndex.id"></el-checkbox>
              </el-col>
              <el-col :span="11" align="middle">
                <img :src="subIndex.imagesUrl" height="120px" />
              </el-col>
              <el-col :span="12">{{ subIndex.bookName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row type="flex" align="middle">
              <el-col align="middle">￥{{ subIndex.price }}</el-col>
              <el-col align="middle">
                <el-input-number
                  v-model="subIndex.number"
                  @change="
                    (val, oldVal) => {
                      handleChange(val, oldVal, subIndex.id)
                    }
                  "
                  @blur="blur()"
                  :min="1"
                  :max="99999"
                  size="mini"
                  label="描述文字"
                ></el-input-number>
              </el-col>
              <el-col align="middle"
                >￥{{ subIndex.price * subIndex.number }}</el-col
              >
              <el-col align="middle" @click.native="deleteById(subIndex.id)"
                >删除</el-col
              >
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    END
    表底
    <el-row style="width: 945px; min-height: 36px" type="flex" align="middle">
      <el-col :span="8">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </el-col>
      <el-col :span="16">
        <el-row type="flex" justify="end" align="middle">
          <el-col :span="6" align="middle">
            <span
              >已选商品<strong>&nbsp;{{ sumNumber }}&nbsp;</strong>件</span
            ></el-col
          >
          <el-col :span="8" align="middle">
            <span
              >合计（不计运费）：<strong> ￥{{ sumPrice }}</strong></span
            ></el-col
          >
          <el-col :span="4" justify="center" align="middle">
            <div
              style="
                background: #ff4301;
                width: 100px;
                height: 50px;
                line-height: 50px;
              "
            >
              去结算
            </div></el-col
          >
        </el-row>
      </el-col>
    </el-row> -->
  </div>
</template>
  
  <!--  <div>
    <Head></Head>
    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <div v-if="active == 0">
        <p>第一个表单</p>
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </div>

      <div v-if="active == 1">
        <p>第二个表单</p>
        <el-form-item label="名称2">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域2">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式2">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </div>

      <div v-if="active == 2">
        <p>最后一个表单</p>
        <el-form-item label="名称3">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域3">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式3">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-button style="margin-top: 12px" @click="next" v-if="active < 3">{{
      messageTip
    }}</el-button>
    <el-button
      style="margin-top: 12px"
      @click="pre"
      v-if="active > 0 && active <= 2"
      >上一步</el-button
    >
  </div> -->



<script>
import Head from '../components/Head'
export default {
  data() {
    return {
      /* 多选表格 START*/
      tableData: [],
      tableDataList: [],
      tableDataListList: [],
      sumNumber: 0,
      sumPrice: 0,
      checkAll: false,
      checkedShops: [],
      shopOptions: [],
      isIndeterminate: true,
      /* 多选表格 END */
      active: 0,
      messageTip: '下一步',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
    }
  },
  components: {
    Head,
  },
  created() {
    this.getShoppingCart()
    // this.handleChange()
  },
  methods: {
    /* 购物车 */
    async getShoppingCart() {
      const { data: res } = await this.$http
        .get('shoppingCart/findByCart')
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      // console.log(res.data)
      if (res.code == 0) {
        this.$message.success('获取成功')
        this.tableData = res.data
      }
      if (res.code == 1) {
        this.$message('获取失败')
      }

      for (let i in this.tableData) {
        /* console.log(i)
        console.log(this.tableData[i]) */
        this.shopOptions.push(i)
        this.tableDataList.push(this.tableData[i])
      }

      for (let i in this.tableDataList) {
        for (let j in this.tableDataList[i]) {
          this.tableDataListList.push(this.tableDataList[i][j])
        }
      }
      for (let i in this.tableDataListList) {
        this.sumNumber = this.sumNumber + this.tableDataListList[i].number
        this.sumPrice =
          this.sumPrice +
          this.tableDataListList[i].number * this.tableDataListList[i].price
      }
    },
    /* 多选 */
    handleCheckAllChange(val) {
      this.checkedShops = val ? this.shopOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.shopOptions.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.shopOptions.length
    },
    /* 计算器 */
    handleChange(currentValue, oldValue, id) {
      let index = 0
      console.log('当前数量：', currentValue, '之前数数', oldValue, 'ID', id)
      /* 此处拿到发生了变化的数据 */
      for (let i in this.tableDataListList) {
        if (this.tableDataListList[i].id == id) {
          index = i
          break
        }
      }
      console.log('更改后的原数据：', this.tableDataListList[index].number)
      /* 原数量：原数据 = 当前数量（currentValue） */
      this.tableDataListList[index].number = currentValue
      /* 总组量：原有的基础上 + 变化后的数量（currentValue - oldValue） */
      this.sumNumber = this.sumNumber + currentValue - oldValue
      /* 总价格：总价格 - 变化前占有的格格 + 变化后占有的价格*/
      this.sumPrice =
        this.sumPrice -
        this.tableDataListList[index].price * oldValue +
        this.tableDataListList[index].price * currentValue
    },
    async deleteById(id) {
      const { data: res } = await this.$http.post('deleteById', {
        id: id,
      })
    },

    next() {
      if (this.active++ > 2) {
        this.active = 0
      }
      if (this.active == 2) {
        this.messageTip = '完成'
      } else {
        this.messageTip = '下一步'
      }
    },
    pre() {
      if (this.active-- < 1) {
        this.active = 1
      }
      if (this.active == 2) {
        this.messageTip = '完成'
      } else {
        this.messageTip = '下一步'
      }
    },
  },
}
</script>

<style scoped>
.sellerName {
  margin: 10px 0 10px 0;
}
</style>
