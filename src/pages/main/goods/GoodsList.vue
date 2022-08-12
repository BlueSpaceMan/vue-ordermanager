<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <div style="margin: 20px"></div>

      <!-- 表格组件 -->
      <template>
        <el-table :data="tableData" v-loading="isLoading" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <template>
                    <img
                      :src="GET_GOODS_IMG_URL + props.row.imgUrl"
                      alt=""
                      width="60px"
                      height="60px"
                    />
                  </template>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述：">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"> </el-table-column>
          <el-table-column label="所属分类" prop="category"> </el-table-column>
          <el-table-column label="商品价格" prop="price"> </el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img
                :src="GET_GOODS_IMG_URL + scope.row.imgUrl"
                alt=""
                width="80px"
                height="80px"
              />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="clickEdit(scope)">{{
                scope.row.isedit ? "确认" : "编辑"
              }}</el-button>
              <el-button size="mini" type="danger" @click="clickDelete(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 模态框组件 -->
      <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="30%">
        <el-form>
          <el-form-item label="商品名称">
            <el-col :span="12">
              <el-input v-model="formobj.name" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="formobj.category" placeholder="请选择商品分类">
              <el-option
                v-for="(item, index) in categorylist"
                :key="index"
                :value="item.cateName"
                :label="item.cateName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-col :span="12">
              <el-input-number
                v-model="formobj.price"
                :min="0"
                label="描述文字"
              ></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-col :span="12">
              <el-upload
                class="avatar-uploader"
                :action="GOODS_IMG_UPLOAD"
                :show-file-list="false"
                :on-success="uploadSuccess"
              >
                <i
                  v-show="!formobj.imgUrl"
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
                <img
                  style="width: 100px"
                  v-show="formobj.imgUrl"
                  :src="GET_GOODS_IMG_URL + formobj.imgUrl"
                  width="100px"
                  height="100px"
                />
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-col :span="18">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="formobj.goodsDesc"
              >
              </el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickConfirmEdit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  goodsList,
  deleteGoods,
  goodsCateName,
  editGoods,
  GET_GOODS_IMG_URL,
  GOODS_IMG_UPLOAD,
} from "@/api/apis";
import { getChinaTime } from "@/utils/utils";

export default {
  data() {
    return {
      // 列表数据
      tableData: [],
      // 当前页
      currentpage: 1,
      // 每页显示条数
      pagesize: 5,
      //   选择每页显示的条数
      pagesizes: [5, 10, 15],
      // 总条数
      total: 0,
      // 显示是否加载中
      isLoading: true,
      imgUrl: "",
      // 获取商品的接口地址
      GET_GOODS_IMG_URL: "",
      // 上传商品的接口地址
      GOODS_IMG_UPLOAD: "",
      // 模态框是否可见
      dialogFormVisible: false,
      // 回填数据
      formobj: {}, // 当前行的数据
      // 商品分类
      categorylist: [],
    };
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      this.isLoading = true;
      // 请求当前页的新数据
      goodsList(this.currentpage, this.pagesize).then((res) => {
        // console.log(res.data);
        // 转换数据格式（时间……）
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getChinaTime(obj.ctime);
          // 添加是否编辑状态
          obj.isedit = false;
        }
        // 本页数据
        this.tableData = arr;
        // 总商品条数
        this.total = res.data.total;
        // 关闭loading加载
        this.isLoading = false;
      });
    },
    // 点击切换条数
    handleSizeChange(newPageSize) {
      // 改变每页条数
      this.pagesize = newPageSize;
      // 渲染数据
      this.getGoodsList();
    },
    // 点击切换页数
    handleCurrentChange(newCurrentPage) {
      // 改变当前页数
      this.currentpage = newCurrentPage;
      //   渲染数据
      this.getGoodsList();
    },
    // 点击删除
    clickDelete(scope) {
      // 弹框确认删除
      this.$confirm("即将删除该菜品, 是否继续?", "系统温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGoods(scope.row.id).then((res) => {
            // 再次渲染删除后的数据
            this.getGoodsList();
            this.$message({
              type: "success",
              message: "系统提示：商品删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击修改
    clickEdit(scope) {
      this.dialogFormVisible = true;
      // 对象深拷贝（JSON方法、展开运算符[...]）
      this.formobj = { ...scope.row };

      // 获取分类
      goodsCateName().then((res) => {
        this.categorylist = res.data.categories;
      });
    },
    // 点击确定修改
    clickConfirmEdit() {
      editGoods(this.formobj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "系统提示：商品修改成功!",
          });

          this.getGoodsList();
          this.dialogFormVisible = false;
        }
      });
    },
    // 成功上传图片
    uploadSuccess(res) {
      if (res.code == 0) {
        this.formobj.imgUrl = res.imgUrl;
      }
    },
  },
  created() {
    this.GET_GOODS_IMG_URL = GET_GOODS_IMG_URL;
    this.GOODS_IMG_UPLOAD = GOODS_IMG_UPLOAD;

    this.getGoodsList();
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
  padding-left: 50px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-pagination {
  padding: 20px 0;
}

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