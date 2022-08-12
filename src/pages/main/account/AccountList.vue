<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户列表</span>
      </div>
      <div style="margin: 20px"></div>

      <!-- 账户列表项 -->
      <template>
        <el-table
          v-loading="isLoading"
          element-loading-text="数据拼命加载中"
          :data="tableData"
          style="width: 100%"
          @selection-change="selectionChange"
          ref="multipleTable"
        >
          <el-table-column
            label="全选"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column label="账号名称" width="180" prop="account">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{ scope.row.account }}</span>
              <el-input
                v-show="scope.row.isedit"
                v-model="scope.row.account"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="用户组" width="180" prop="userGroup">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{ scope.row.userGroup }}</span>
              <el-input
                v-show="scope.row.isedit"
                v-model="scope.row.userGroup"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="180" prop="ctime">
          </el-table-column>

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

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 批量删除 -->
      <el-button type="danger" @click="clickBatchDelete" style="margin: 10px 0"
        >批量删除</el-button
      >
      <el-button type="primary" @click="toggleSelection">取消选择</el-button>
    </el-card>
  </div>
</template>


<script>
import {
  accountList,
  deleteAccount,
  batchDeleteAccount,
  editAccount,
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
      // 总条数
      total: null,
      // 显示是否加载中
      isLoading: true
    };
  },
  methods: {
    // 点击编辑
    clickEdit(scope) {
      if (scope.row.isedit) {
        // 可编辑状态，调用接口
        scope.row.isedit = false;
        editAccount(scope.row.id, scope.row.account, scope.row.userGroup).then(
          (res) => {
            if (res.data.code == 0) {
              // 渲染删除后的数据
              this.getAccountList();
              // 弹框消息
              this.$message({
                type: "success",
                message: "系统提示：修改成功!",
              });
            } else this.$message.error("系统提示：修改失败！");
          }
        );
      } else {
        scope.row.isedit = true;
      }
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
          deleteAccount(scope.row.id).then((res) => {
            if (res.data.code == 0)
              // 再次渲染删除后的数据
              this.getAccountList();
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

    // 复选框发生变化
    selectionChange(arr) {
      // 循环对象，返回所有其id
      this.ids = JSON.stringify(arr.map((item) => item.id));
    },
    // 点击批量删除
    clickBatchDelete() {
      // 弹框确认删除
      this.$confirm("此操作将批量删除该用户, 是否继续?", "系统温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          batchDeleteAccount(this.ids).then((res) => {
            if (res.data.code == 0)
              // 渲染删除后的数据
              this.getAccountList();
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
      this.getAccountList();
    },
    // 点击切换页数
    handleCurrentChange(newCurrentPage) {
      // 改变当前页数
      this.currentpage = newCurrentPage;
      //   渲染数据
      this.getAccountList();
    },
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 获取用户列表
    getAccountList() {
        this.isLoading = true;
      // 请求当前页的新数据
      accountList(this.currentpage, this.pagesize).then((res) => {
        // console.log(res.data)
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
  },
  created() {
    this.getAccountList();
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  padding: 20px 0;
}
</style>