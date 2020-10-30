<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商家列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加商家</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="tableData" border stripe>
        <!--  -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="店铺ID" prop="sid"></el-table-column>
        <el-table-column label="店铺名字" prop="sellerName"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="tabListPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo + 1"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 主容主体信息 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="店铺ID" prop="sid">
          <el-input v-model="addForm.sid"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" prop="sellerName">
          <el-input v-model="addForm.sellerName"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="店铺ID" prop="sid">
          <el-input v-model="editForm.sid" disabled></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" prop="sellerName">
          <el-input v-model="editForm.sellerName"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总数据
      tableData: [],
      // 个数选择器（可修改）
      pageSizes: [1, 2, 5, 10],
      // 默认显示第几页       // currentPage: 1,
      pageNo: 0,
      // 默认每页显示的条数（可修改）
      pageSize: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)       // totalCount: 1,
      totalRecord: 0,
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        sid: '',
        sellerName: '',
        username: '',
        password: '',
        address: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '用户名的长度在3~15个字符之间',
            trigger: 'blur',
          },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {
        id: '',
        sid: '',
        sellerName: '',
        username: '',
        password: '',
        address: '',
      },
      // 修改表单的验证规则对象
      editFormRules: {},
    }
  },

  methods: {
    //get发起用户列表请求
    // async getData() {
    //   const { data: res } = await this.$http.get('seller/page', {
    //     params: { pageNo: this.pageNo, pageSize: this.pageSize },
    //   })
    //   console.log(res)
    //   // 用户列表赋值给tableData
    //   this.tableData = res.data.results
    //   // 列表数据总数totalRecord
    //   this.totalRecord = res.totalRecord
    //   //当前页码*（第几页）
    //   this.pageNo = res.pageNo
    //   //当前页要显示多少条数据
    //   this.pageSize = res.pageSize
    // },
    async getData() {
      const { data: res } = await this.$http.get('seller/findAll')
      this.tableData = res.data
    },

    // 每页显示的条数
    handleSizeChange(val) {
      console.log(val + '条/页')
      // 改变每页显示的条数
      this.pageSize = val
      console.log('每页要显示' + this.pageSize)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNo = 0
      this.getData()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageNo = val
      this.getData()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post(
          'seller/insert',
          this.addForm
        )
        if (res.code == 1) {
          this.$message.error(res.msg)
        } else if (res.code == 0) {
          this.$message.success('添加用户成功！')
        }
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getData()
      })
    },
    // 展示编辑用户的对话框
    showEditDialog(id) {
      const editText = id
      console.log(editText)
      // const { data: res } = await this.$http.get('admin/getById', {
      //   params: { id: id },
      // })
      // if (res.code !== 0) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      // this.editForm = res.data
      this.editForm = editText
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.post('seller/update', {
          id: this.editForm.id,
          sid: this.editForm.sid,
          sellerName: this.editForm.sellerName,
          username: this.editForm.username,
          password: this.editForm.password,
          address: this.editForm.address,
        })
        if (res.code == 0) {
          // 提示修改成功
          this.$message.success(res.msg)
        }
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getData()
      })
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('seller/delete', {
        params: { id: id },
      })
      if (res.code !== 0) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getData()
    },
  },
  created: function () {
    this.getData()
  },
}
</script>

<style>
</style>