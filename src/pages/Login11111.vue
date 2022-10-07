<template>
  
    <!-- <div class="title-box">餐饮管理系统</div>
    <div class="center-box">
      <el-input
        placeholder="请输入账号"
        v-model="acc"
        clearable
        prefix-icon="el-icon-user"
      >
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="pwd"
        show-password
        prefix-icon="el-icon-lock"
      ></el-input>
      <p class="error-p">{{ errormsg }}</p>

      <el-button type="primary" style="width: 100%" @click="clickLogin"
        >登录</el-button
      >
    </div> -->
<div>
<div class="container right-panel-active">

    <!-- Sign In -->
    <div class="container__form container--signin">
      <form action="#" class="form" id="form2">
        <h2 class="form__title">餐饮系统管理</h2>
         <el-input
        placeholder="请输入账号"
        v-model="acc"
        clearable
        prefix-icon="el-icon-user"
      >
      </el-input>
        <el-input
        placeholder="请输入密码"
        v-model="pwd"
        show-password
        prefix-icon="el-icon-lock"
      ></el-input>
       <p class="error-p">{{ errormsg }}</p>

        <button class="btn"  @click="clickLogin">Sign In</button>
      </form>
    </div>

    <!-- Overlay -->
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <button class="btn" id="signIn">餐饮管理系统</button>
        </div>
        <div class="overlay__panel overlay--right">
          <button class="btn" id="signUp">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</div>
    

</template>

<script>
// @指向src的根目录
import { login } from "@/api/apis";

export default {
  data() {
    return {
      // 账号
      acc: "",
      // 密码
      pwd: "",
      //   错误消息
      errormsg: "",
      
    };
  },
  methods: {
    // setLoading(){
    //   setTimeout(() => {
    //       this.fullscreenLoading = false;
    //     }, 500);
    // },

    clickLogin() {
      //   console.log(this.acc, this.pwd);
      login(this.acc, this.pwd).then((res) => {
        // console.log(res.data);
        // 定义返回的消息值
        var msg = res.data.msg;
        if (res.data.code == 0) {
          // 成功
          // 写入token
          localStorage.token = res.data.token;
          // 写入权限（用户组）
          localStorage.role = res.data.role;
          // 写入当前用户名
          localStorage.acc = this.acc;
          // 写入当前id
          localStorage.id = res.data.id;

          // this.$router指向的是main里面的router,push改变hash
          this.$router.push("./main/backgroundpage");

          this.$message({
            message: msg,
            type: "success",
          });
        }
        // 失败
        else this.errormsg = msg;
      });
    },
    
  },
};
</script>

<style lang="less" scoped>
//  *{
//       font-size: 16px;
//       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//         Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//     }

    body {
      align-items: center;
      // justify-content: center;
      background-color: #e9e9e9;
      background: url("https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg");
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: grid;
      height: 100vh;
      place-items: center;
    }
.container{
  align-items: center;
      justify-content: center;
      display: flex;

}
    .form__title {
      font-weight: 300;
      margin: 0;
      margin-bottom: 1.25rem;
    }

    .link {
      color: #333;
      font-size: 0.9rem;
      margin: 1.5rem 0;
      text-decoration: none;
    }

    .container {
      background-color: #e9e9e9;
      border-radius: 0.7rem;
      box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
      height: 420px;
      max-width: 758px;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .container__form {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.6s ease-in-out;
    }

    .container--signin {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .container.right-panel-active .container--signin {
      transform: translateX(100%);
    }


    .container.right-panel-active .container--signup {
      animation: show 0.6s;
      opacity: 1;
      transform: translateX(100%);
      z-index: 5;
    }

    .container__overlay {
      height: 100%;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: 0;
      transition: transform 0.6s ease-in-out;
      width: 50%;
      z-index: 100;
    }

    .container.right-panel-active .container__overlay {
      transform: translateX(-100%);
    }

    .overlay {
      background-color: #008997;
      background: url("https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg");
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      left: -100%;
      position: relative;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 200%;
    }

    .container.right-panel-active .overlay {
      transform: translateX(50%);
    }

    .overlay__panel {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      position: absolute;
      text-align: center;
      top: 0;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 50%;
    }

    .overlay--left {
      transform: translateX(-20%);
    }

    .container.right-panel-active .overlay--left {
      transform: translateX(0);
    }

    .overlay--right {
      right: 0;
      transform: translateX(0);
    }

    .container.right-panel-active .overlay--right {
      transform: translateX(20%);
    }

    .btn {
      background-color: #0367a6;
      background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
      border-radius: 20px;
      border: 1px solid #0367a6;
      color: #e9e9e9;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      padding: 0.9rem 4rem;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
    }

    .form>.btn {
      margin-top: 1.5rem;
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn:focus {
      outline: none;
    }

    .form {
      background-color: #e9e9e9;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 3rem;
      height: 100%;
      text-align: center;
    }

    .input {
      background-color: #fff;
      border: none;
      padding: 0.9rem 0.9rem;
      margin: 0.5rem 0;
      width: 100%;
    }

    @keyframes show {

      0%,
      49.99% {
        opacity: 0;
        z-index: 1;
      }

      50%,
      100% {
        opacity: 1;
        z-index: 5;
      }
    }
</style>