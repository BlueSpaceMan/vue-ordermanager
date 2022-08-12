<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div style="margin: 20px"></div>
      <!-- 添加的商品信息 -->
      <el-form label-width="80px">
        <el-form-item label="商品名称">
          <el-col :span="12">
            <el-input
              placeholder="请输入商品名称"
              v-model="goodsName"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品分类" size="">
          <el-col>
            <el-select placeholder="请选择商品分类" v-model="selectValue">
              <el-option
                v-for="(item, index) in categories"
                :key="index"
                :value="item.cateName"
                :label="item.cateName"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="商品价格">
          <template>
            <el-input-number
              v-model="price"
              
              :min="0"
              label="描述文字"
            ></el-input-number>
          </template>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="GOODS_IMG_UPLOAD"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <i
              v-show="imgUrl == ''"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <img
              style="width: 100px"
              v-show="imgUrl != ''"
              :src="GET_GOODS_IMG_URL + imgUrl"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="goodsInfo"
            >
            </el-input
          ></el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickAdd">添加商品</el-button>
          <el-button @click="clickReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
        
     

<script>
import {
  addGoods,
  goodsCateName,
  GOODS_IMG_UPLOAD,
  GET_GOODS_IMG_URL,
} from "@/api/apis";
export default {
  data() {
    return {
      // 商品名称
      goodsName: "",
      // 商品分类值
      selectValue: "",
      // 商品价格
      price: 1,
      // 商品描述
      goodsInfo: "",
      // 商品分类数组
      categories: [],
      // 上传图片的路径
      imgUrl: "",
      // 图片上传的接口地址
      GOODS_IMG_UPLOAD: "",
      // 获取图片的地址
      GET_GOODS_IMG_URL: "",
    };
  },
  methods: {
    // 点击添加
    clickAdd() {
      let { goodsName, selectValue, price, imgUrl, goodsInfo } = this;
      addGoods(goodsName, selectValue, price, imgUrl, goodsInfo).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: `系统提示：恭喜你，成功添加商品信息！`,
            type: "success",
          });
          this.clickReset();
        } else this.$message.error(`系统提示：抱歉，提交错误，请重试！`);
      });
    },
    // 点击重置
    clickReset() {
      this.goodsName = this.selectValue = this.imgUrl = this.goodsInfo = "";
      this.price = 1
    },
    // 成功上传图片
    uploadSuccess(res) {
      if (res.code == 0) {
        this.imgUrl = res.imgUrl;
      }
    },
  },
  created() {
    this.GOODS_IMG_UPLOAD = GOODS_IMG_UPLOAD;
    this.GET_GOODS_IMG_URL = GET_GOODS_IMG_URL;
    goodsCateName().then((res) => {
      this.categories = res.data.categories;

      // 设置默认选项
      this.selectValue = this.categories[0].cateName;
    });
  },
};
</script>

<style lang="less" scoped>
.el-upload {
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>