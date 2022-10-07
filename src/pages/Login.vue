<template>
  <div class="login">
    <div class="login-container">
      <div class="login-info">
        <p>Welcome</p>
        <p>饱了吗商家管理系统</p>
      </div>
      <div class="login-form">
        <el-input
          placeholder="请输入账号"
          v-model="acc"
          clearable
          prefix-icon="el-icon-user"
        ></el-input>
        <el-input
          placeholder="请输入密码"
          v-model="pwd"
          show-password
          prefix-icon="el-icon-lock"
        ></el-input>
        <p class="error-p">{{ errormsg }}</p>

        <slide-verify
          v-show="isshow"
          :l="42"
          :r="10"
          :w="320"
          :h="200"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :slider-text="text"
        ></slide-verify>

        <el-button type="primary" style="width: 100%;" @click="clickLogin">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @指向src的根目录
import { login } from '@/api/apis'

export default {
  data() {
    return {
      // 账号
      acc: '',
      // 密码
      pwd: '',
      //   错误消息
      errormsg: '',
      // 验证码框是否显示
      isshow: false,
      text: '向右滑动完成验证',
    }
  },

  methods: {
    clickLogin() {
      // console.log(this.acc, this.pwd);
      this.isshow = true
    },
    onSuccess() {
      this.text = '验证成功'
      this.timingHide();
      // this.isshow = false
      login(this.acc, this.pwd).then((res) => {
        console.log(res.data)
        // 定义返回的消息值
        var msg = res.data.msg
        if (res.data.code == 0) {
          // 成功
          // 写入token
          localStorage.token = res.data.token
          // 写入权限（用户组）
          localStorage.role = res.data.role
          // 写入当前用户名
          localStorage.acc = this.acc
          // 写入当前id
          localStorage.id = res.data.id

          // this.$router指向的是main里面的router,push改变hash
          this.$router.push('./main/backgroundpage')

          this.$message({
            message: msg,
            type: 'success',
          })
        }
        // 失败
        else {
          this.errormsg = msg
          this.timingHide();
        }
      })
    },
    // 滑动验证码失败
    onFail() {
      this.text = '验证失败, 请重新验证'
    },
    onRefresh() {},

    // 定时隐藏
    timingHide() {
      let timer = setTimeout(() => {
        this.isshow = false
      }, 2000)

      // clearTimeout(timer)
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/img/login.jpeg') no-repeat;
  background-size: 100% 100%;
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 480px;

    .login-info {
      width: 50%;
      height: 480px;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        // font-family: '华文行楷';
        font-size: 36px;
        text-shadow: rgba(255, 255, 255, 0.5);
        color: #fff;
        margin: 15px 0;
      }
    }
    .login-form {
      box-sizing: border-box;
      background-color: #f9fbfa;
      height: 480px;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px 40px;

      .error-p {
        color: brown;
        font-size: 12px;
        padding: 5px 0;
      }
      .el-input {
        margin: 10px 0;
      }
      .el-button {
        margin: 10px 0;
      }
    }
  }
}
</style>
