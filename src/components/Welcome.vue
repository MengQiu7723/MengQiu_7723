<template>
  <div>
    <!-- 表头 -->
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
    <!-- START -->
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
              <el-col :span="1" :offset="1" align="middle"
                ><el-checkbox></el-checkbox>
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
                  @change="handleChange"
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
    <!-- END -->
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
      multipleSelection: ['上海', '北京', '广州', '深圳'],
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
    console.log(this.multipleSelection)
    console.log(this.shopOptions)
  },
  methods: {
    /* 购物车 */
    async getShoppingCart() {
      const { data: res } = await this.$http.get('shoppingCart/findByCart', {
        /* 请求参数：id */
        params: { uid: 3 },
      })
      // console.log(res.data)
      if (res.code == 0) {
        this.$message.success('获取成功')
        this.tableData = res.data
      }
      if (res.code == 1) {
        this.$message('获取失败')
      }
      // console.log(typeof this.shopOptions)
      /* 因为没有用到el-table，所以下面的内容暂时用不上 */
      for (var i in this.tableData) {
        console.log(i)
        console.log(this.tableData[i])
        this.shopOptions.push(i)
        this.tableDataList.push(this.tableData[i])
      }
      // for (var j in this.tableDataList) {
      //   console.log(this.tableDataList[j])
      // }
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
    handleChange(value) {
      console.log(value)
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
