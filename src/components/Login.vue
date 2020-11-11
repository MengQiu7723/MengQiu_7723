<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="adminName">
          <el-input
            v-model="loginForm.adminName"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-radio v-model="radio" label="1">管理员</el-radio>
        <el-radio v-model="radio" label="2">商家</el-radio>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login()" v-if="radio == '1'"
            >管理员登录</el-button
          >
          <el-button
            type="primary"
            @click="BusinessmanLogin()"
            v-if="radio == '2'"
            >商家登录</el-button
          >
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
      // 这是登录表单的数据绑定对象
      loginForm: {
        adminName: 'admin',
        password: '123456',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        adminName: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    //登录按钮事件
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        //get请求
        const { data: res } = await this.$http.get('admin/login', {
          params: this.loginForm,
        })
        if (res.code == 0) {
          //登录成功状态码，这个是后端定义的
          // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
          //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
          // window.sessionStorage.setItem('token', res.data)
          window.localStorage.setItem('role', 0)
          this.$message.success('登录成功')
          this.$router.push('/home')
        } else if (res.code == 1) {
          this.$message.error(res.msg + '，登录失败！')
        }
      })
    },
    BusinessmanLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        //get请求
        const { data: res } = await this.$http.get('seller/login', {
          params: {
            username: this.loginForm.adminName,
            password: this.loginForm.password,
          },
        })
        if (res.code == 0) {
          // window.sessionStorage.setItem('token', res.data)
          window.localStorage.setItem('role', 1)
          this.$message.success('登录成功')
          this.$router.push('/home')
        } else if (res.code == 1) {
          this.$message.error(res.msg + '，登录失败！')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
