<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类</span>
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加分类</el-button
        >
      </div>
      <div style="margin: 20px"></div>

      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="分类名称">
            <el-input v-model="catename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <template>
              <el-switch
                v-model="statevalue"
                active-color="#409EFF"
                inactive-color="#eee"
              ></el-switch>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickAddCate()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 数据表格 -->
      <el-table :data="dataList" style="width: 100%">
        <el-table-column width="50" type="index" label="序号"></el-table-column>
        <el-table-column label="分类名称" width="230" prop="cateName">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
            <el-input
              v-show="scope.row.isedit"
              v-model="scope.row.cateName"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="180" prop="state">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isedit"
              v-model="scope.row.state"
              active-color="#409EFF"
              inactive-color="#eee"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="clickEdit(scope)">
              {{ scope.row.isedit ? "确认" : "编辑" }}
            </el-button>
            <el-button size="mini" type="danger" @click="clickDelete(scope)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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
  goodsCateList,
  editGoodsCate,
  deleteGoodsCate,
  addGoodsCate,
} from "@/api/apis";
export default {
  data() {
    return {
      // 数据数组
      dataList: [],
      // 当前页
      currentpage: 1,
      // 每页显示条数
      pagesize: 5,
      // 每页显示条数数组
      pagesizes: [5, 10, 15],
      // 总条数
      total: null,
      form: "",
      // 新增分类名
      catename: "",
      // 是否显示
      statevalue: true,
      dialogFormVisible: false,
    };
  },
  methods: {
    // 点击编辑
    clickEdit(scope) {
      if (scope.row.isedit) {
        // 可编辑状态，调用接口

        editGoodsCate(scope.row).then((res) => {
          console.log(res.data);
          if (res.data.code == 0) {
            // 弹框消息
            this.$message({
              type: "success",
              message: "系统提示：修改成功!",
            });
          } else this.$message.error("系统提示：修改失败！");
          scope.row.isedit = false;
        });
      } else scope.row.isedit = true;
    },
    // 点击删除
    clickDelete(scope) {
      // 弹框确认删除
      this.$confirm("此操作将永久删除该用户, 是否继续?", "系统温馨提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          deleteGoodsCate(scope.row.id).then((res) => {
            if (res.data.code == 0)
              // 再次渲染删除后的数据
              this.getGoodsCateList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击切换条数
    handleSizeChange(newPageSize) {
      // 改变每页条数
      this.pagesize = newPageSize;
      // 渲染数据
      this.getGoodsCateList();
    },
    // 点击切换页数
    handleCurrentChange(newCurrentPage) {
      // 改变当前页数
      this.currentpage = newCurrentPage;
      //   渲染数据
      this.getGoodsCateList();
    },
    // 获取分类列表
    getGoodsCateList() {
      goodsCateList(this.currentpage, this.pagesize).then((res) => {
        // console.log(res);
        // 数据数组
        let dataArr = res.data.data;
        for (let i = 0; i < dataArr.length; i++) {
          dataArr[i].state = dataArr[i].state == 1;
          dataArr[i].isedit = false;
        }

        this.dataList = dataArr;
        // 数据总条数
        this.total = res.data.total;
      });
    },
    // 点击添加分类
    clickAddCate() {
      // this.dialogFormVisible = true;
      // 转换值
      if (this.statevalue) this.statevalue = 1;
      else this.statevalue = 0;
      console.log(this.statevalue)
      addGoodsCate(this.catename, this.statevalue).then((res) => {
        if (res.data.code == 0) {
          // 弹框消息
          this.$message({
            type: "success",
            message: "系统提示：商品分类添加成功!",
          });
        } else this.$message.error("系统提示：商品分类添加失败！");
        this.getGoodsCateList();
        // 清空分类名
        this.catename = "";
        
        this.statevalue = true;
        // 关闭弹框
        this.dialogFormVisible = false;
      });
    },
  },

  created() {
    this.getGoodsCateList();
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
  .el-pagination {
    padding: 20px 0;
  }
}
</style>
