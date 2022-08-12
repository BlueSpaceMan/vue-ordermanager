<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div style="margin: 20px"></div>
      <!-- 修改密码界面 -->
      <el-form label-width="80px">
        <el-form-item label="原密码">
          <el-col :span="8">
            <el-input
              placeholder="请输入账号"
              v-model="oldpwd"
              type="password"
            ></el-input>
            <p class="errormsg">{{ erroldmsg }}</p>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" size="">
          <el-col :span="8">
            <el-input
              placeholder="请设置新密码"
              v-model="newpwd"
              type="password"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码" size="">
          <el-col :span="8">
            <el-input
              placeholder="请设置确认密码"
              v-model="confirmpwd"
              type="password"
            ></el-input>
          <p class="errormsg">{{ errcomfirmmsg }}</p>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickChange">确认修改</el-button>
          <el-button @click="clickReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { checkOldPwd, changePwd } from "@/api/apis";
export default {
  data() {
    return {
      // 原密码
      oldpwd: "",
      // 新密码
      newpwd: "",
      // 确认密码
      confirmpwd: "",
      // 旧密码错误提示
      erroldmsg: "",
      //   确认密码错误提示
      errcomfirmmsg: "",
    };
  },
  methods: {
    // 点击确认修改
    clickChange() {
      // console.log(this.oldpwd,localStorage.id)
      checkOldPwd(localStorage.id, this.oldpwd).then((res) => {
        // 验证旧密码
        if (res.data.code == 0) {
          // 验证新密码和确认密码
          if (this.newpwd === this.confirmpwd) {
            changePwd(localStorage.id, this.newpwd).then((res) => {
            // 成功修改
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                this.clickReset()
              }
            });
          } else this.errcomfirmmsg = "两次密码输入不一致！";
        } else this.erroldmsg = res.data.msg;
      });
    },
    // 点击重置
    clickReset() {
        this.oldpwd = this.newpwd = this.confirmpwd = "";
    },
  },
};
</script>

<style lang="less" scoped>
.errormsg {
  color: rgb(206, 61, 61);
  font-size: 12px;
}
</style>