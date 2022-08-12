<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账户</span>
      </div>
      <div style="margin: 20px"></div>
      <!-- 添加的账户信息 -->
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-col :span="8">
            <el-input placeholder="请输入账号" v-model="addaccount"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" size="">
          <el-col :span="8">
            <el-input
              placeholder="请设置密码"
              v-model="addpassword"
              type="password"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select placeholder="请选择用户组" v-model="userGroup">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickAdd">添加用户</el-button>
          <el-button @click="clickReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addAccount } from "@/api/apis";
export default {
  data() {
    return {
      // 新增账号
      addaccount: "",
      // 新增密码
      addpassword: "",
      // 新增账号权限
      userGroup: "",
      // 账号权限数组
      options: [
        { lable: "超级管理员", value: "超级管理员" },
        { lable: "普通管理员", value: "普通管理员" },
      ],
    };
  },
  methods: {
    clickAdd() {
      // 解构赋值
      let { addaccount, addpassword, userGroup } = this;
      addAccount(addaccount, addpassword, userGroup).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message({
            message: `系统提示：恭喜你，成功添加用户信息！`,
            type: "success",
          });
          this.clickReset()
        } else this.$message.error(`系统提示：抱歉，提交错误，请重试！`);
      });
    },
    clickReset() {
      this.userGroup = this.addpassword = this.addaccount = "";
    },
  },
};
</script>

<style lang="less" scoped>
</style>