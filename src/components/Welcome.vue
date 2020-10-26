<template>
  <div>
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
  </div>
</template>


<script>
import Head from '../components/Head'
export default {
  data() {
    return {
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
  methods: {
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