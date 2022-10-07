<template>
  <div class="login-box">
    <div class="title-box">餐饮管理系统</div>
    <div class="center-box">
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
        :w="300"
        :h="155"
        @success="onSuccess"
        @fail="onFail"
        :slider-text="text"
      ></slide-verify>

      <el-button type="primary" style="width: 100%;" @click="clickLogin">
        登录
      </el-button>
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
      //   console.log(this.acc, this.pwd);
      this.isshow = true
    },
    onSuccess() {

      this.text = '验证成功'
      // 定时器
      setTimeout(function () {
      this.isshow = false

      }, 1000)
      login(this.acc, this.pwd).then((res) => {
        // console.log(res.data);
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
        else this.errormsg = msg
      })  
    },
    // 滑动验证码失败
    onFail() {
      this.text = '验证失败, 请重新验证'
    },
  },
}
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 0;
  // background: url(../assets/login.jpg);
  background: url('https://images.pexels.com/photos/1079020/pexels-photo-1079020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: 100% 100%;
  background-attachment: fixed;
  .title-box {
    color: aliceblue;
    font-size: 32px;
    font-family: '宋体';
    padding-bottom: 15px;
    text-shadow: 0 8px 5px rgba(0, 0, 0, 0.5);
  }
  .center-box {
    box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
    opacity: 1;
    width: 300px;
    height: 200px;
    padding: 40px 30px;
    background-color: #00000060;
    border-radius: 1%;
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
</style>
