<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button type="primary" @click="clickSave"
          >保存</el-button
        >
      </div>
      <div style="margin: 20px"></div>

      <!-- 店铺信息-->
      <!-- 店铺名称  -->
      <el-row>
        <el-col :span="10">
          店铺名称
          <el-input v-model="name" placeholder="店铺名称"></el-input>
        </el-col>
      </el-row>
      <!-- 店铺公告 -->
      <el-row>
        店铺公告
        <el-col :span="8">
          <el-input
            v-model="bulletin"
            type="textarea"
            :rows="4"
            placeholder="店铺描述"
          ></el-input>
        </el-col>
      </el-row>
      <!-- 店铺头像 -->
      <el-row>
        店铺头像
        <el-col :span="8">
          <div class="inner">
            <el-upload
              :action="SHOPS_IMG_UPLOAD"
              :on-success="avatarUploadSuccess"
              :show-file-list="false"
            >
              <img
                width="150px"
                height="150px"
                :src="avatar == '' ? '' : GET_SHOPS_IMG + avatar"
                alt
              />
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 店铺图片 -->
      <el-row>
        店铺图片
        <el-col :span="8">
          <div class="inner">
            <el-upload
              :action="SHOPS_IMG_UPLOAD"
              list-type="picture-card"
              :on-success="shopimgsUploadSuccess"
              :on-remove="removeImg"
              :file-list="shopimgs"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <!-- 配送费  -->
      <el-row>
        <el-col :span="10">
          配送费
          <div class="distribution">
            <el-input v-model="deliveryPrice" placeholder="配送费"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 配送时间  -->
      <el-row>
        <el-col :span="10">
          配送时间
          <el-input v-model="deliveryTime" placeholder="配送时间"></el-input>
        </el-col>
      </el-row>
      <!-- 配送描述  -->
      <el-row>
        <el-col :span="10">
          配送描述
          <el-input v-model="description" placeholder="配送描述"></el-input>
        </el-col>
      </el-row>
      <!-- 评分  -->
      <el-row>
        <el-col :span="10">
          店铺评分
          <el-input v-model="score" placeholder="店铺评分"></el-input>
        </el-col>
      </el-row>
      <!-- 销量  -->
      <el-row>
        <el-col :span="10">
          店铺销量
          <el-input v-model="sellCount" placeholder="销量"></el-input>
        </el-col>
      </el-row>
      <!-- 活动 -->
      <el-row>
        店铺活动
        <el-col :span="8">
          <div class="sales">
            <el-checkbox-group v-model="supports">
              <el-checkbox label="夏日大促全场饮品8折"></el-checkbox>
              <el-checkbox label="套餐限时5折"></el-checkbox>
              <el-checkbox label="满30-2"></el-checkbox>
              <el-checkbox label="充值100送100"></el-checkbox>
              <el-checkbox label="充值1000送500"></el-checkbox>
              <el-checkbox label="首单额外减5块"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <!-- 营业时间 -->
      <el-row>
        <el-col :span="10">
          营业时间
          <div class="time">
            <el-time-picker
              is-range
              v-model="date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { shopInfo,editShops,GET_SHOPS_IMG, SHOPS_IMG_UPLOAD } from "@/api/apis";
import { getChinaTime } from "@/utils/utils";

export default {
  data() {
    return {
      dialogImageUrl: "",
      // 店铺头像地址
      GET_SHOPS_IMG: "",
      // 上传店铺头像地址
      SHOPS_IMG_UPLOAD: "",
      // 店铺名字
      name: "",
      // 店铺描述
      bulletin: "",
      // 店铺头像
      avatar: "",
      // 配送费
      deliveryPrice: "",
      // 配送时间
      deliveryTime: "",
      // 配送描述
      description: "",
      // 店铺图片
      pics: [],
      // 评分
      score: "",
      // 销量
      sellCount: "",
      // 活动
      supports: "",
      // 营业时间
      date: [],
      //回填店铺图片数组
      shopimgs: [],
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 头像上传成功
    avatarUploadSuccess(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        // 弹框消息
        this.$message({
          type: "success",
          message: "系统提示：店铺头像上传成功!",
        });
      }
    },
    // 店铺图片上传成功
    shopimgsUploadSuccess(res) {
      if (res.code == 0) {
        this.pics.push(res.imgUrl);
      }
    },
    // 删除店铺图片
    removeImg(res) {
        this.pics.splice(this.pics.indexOf(res.name),1);
    },
    // 保存修改
    clickSave(){
var params = {
        id: this.id,
        name: this.name,
        bulletin: this.bulletin,
        avatar: this.avatar,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        score: this.score,
        sellCount: this.sellCount,
        //字符串数组
        date: JSON.stringify([
          getChinaTime(this.date[0]),
          getChinaTime(this.date[1])
        ]),
        supports: JSON.stringify(this.supports),
        pics: JSON.stringify(this.pics)
      };

      editShops(params).then(res =>{
        if(res.data.code == 0){
            this.$message({
          type: "success",
          message: "系统提示：店铺信息编辑成功!",
        });
        }
      })
    }
  },
  created() {
    this.GET_SHOPS_IMG = GET_SHOPS_IMG;
    this.SHOPS_IMG_UPLOAD = SHOPS_IMG_UPLOAD;

    shopInfo().then((res) => {
      for (let key in res.data.data) {
        // 循环赋值
        this[key] = res.data.data[key];
      }

      // 回填照片墙图片
      this.shopimgs = this.pics.map((imgstr) => {
        return {
          name: imgstr,
          url: GET_SHOPS_IMG + imgstr,
        };
      });
    });
  },
};
</script>

<style lang="less" scoped>
.el-card {
  .clearfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-col {
  display: flex;
  align-items: center;
  .el-input,
  .el-textarea,
  .el-select {
    flex: 1;
    margin-left: 10px;
  }
  .el-input-number,
  .inner {
    margin-left: 10px;
  }
}
.el-row {
  margin: 20px 0;
  display: flex;
  .el-upload,
  .time {
    margin-left: 10px;
  }
  .el-button {
    margin-left: 100px;
  }
  .distribution {
    margin-left: 15px;
  }
  .sales {
    margin-left: 15px;
  }
  .el-checkbox {
    margin-bottom: 15px;
  }
}
</style>