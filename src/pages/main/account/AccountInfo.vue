<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div style="margin: 20px"></div>

      <!-- 分隔栏 -->
      <template>
        <div>
          <span>管理员ID：{{ id }}</span>
          <el-divider></el-divider>
          <span>账号：{{ account }}</span>
          <el-divider></el-divider>
          <span>用户组：{{ userGroup }}</span>
          <el-divider></el-divider>
          <span>创建时间：{{ ctime }}</span>
          <el-divider></el-divider>
          <div class="headportrait-box">
            <span class="headportrait-text">管理员头像：</span>

            <el-upload
              class="avatar-uploader"
              :action="ACCOUNT_IMG_UPLOAD"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :data="uploadData"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div></div></template
    ></el-card>
  </div>
</template>


<script>
import { accountInfo, ACCOUNT_IMG_UPLOAD } from "@/api/apis";
import { getChinaTime } from "@/utils/utils";

export default {
  data() {
    return {
      // 管理员id
      id: "",
      // 账号
      account: "",
      // 用户组
      userGroup: "",
      // 创建时间
      ctime: "",
      // 上传文件附加数据
      uploadData: {},
      // 头像上传路径
      imageUrl: "",
      // 头像上传接口地址
      ACCOUNT_IMG_UPLOAD: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        // 消息弹框
        this.$message({
          message: `系统提示：头像上传成功！`,
          type: "success",
        });
        // $bus发出通知
        this.$bus.$emit("imgUploadFinish");
      }
    },
  },

  created() {
    this.ACCOUNT_IMG_UPLOAD = ACCOUNT_IMG_UPLOAD;
    accountInfo(localStorage.id).then((res) => {
      this.id = res.data.accountInfo.id;
      this.account = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.ctime = getChinaTime(res.data.accountInfo.ctime);
      this.uploadData = { id: localStorage.id };
    });
  },
};
</script>

<style lang="less" scoped>
.headportrait-box {
  display: flex;
  align-items: center;
}

.el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  width: 100px;
  height: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>