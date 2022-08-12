<template>
  <div>
    <el-card class="box-card">
      <template>
        <!-- 表单组件 -->
        <el-form :inline="true">
          <el-form-item label="订单号">
            <el-input
              v-model="orderNo"
              autocomplete="off"
              placeholder="请输入订单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input
              v-model="consignee"
              autocomplete="off"
              placeholder="请输入收货人"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              v-model="phone"
              autocomplete="off"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select placeholder="请选择订单状态" v-model="orderState">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :value="item"
                :label="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <!-- 日期查询 -->
      <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" @click="clickSearch" icon="el-icon-search"
          >搜索</el-button
        >
      </div>

      <!-- 表格数据 -->
      <el-table
        :data="gridData"
        border
        style="width: 100%"
        v-loading="loadDate"
      >
        <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column
          prop="deliverAddress"
          label="配送地址"
        ></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="clickViewOrder(scope)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="clickEditOrder(scope)"
              >编辑</el-button
            >
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

      <!-- 查看信息 -->
      <el-dialog title="订单详情" :visible.sync="dialogViewVisible" width="30%">
        <template>
          <el-form :data="inlineData">
            <el-form-item label="订单 ID">
              <span>{{ inlineData.id }}</span>
            </el-form-item>
            <el-form-item label="订单号">
              <span>{{ inlineData.orderNo }}</span>
            </el-form-item>
            <el-form-item label="下单时间" prop="">
              <span>{{ inlineData.orderTime }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ inlineData.phone }}</span>
            </el-form-item>
            <el-form-item label="收货人">
              <span>{{ inlineData.consignee }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ inlineData.deliverAddress }}</span>
            </el-form-item>
            <el-form-item label="送达时间">
              <span>{{ inlineData.deliveryTime }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ inlineData.remarks }}</span>
            </el-form-item>
            <el-form-item label="订单金额">
              <span>{{ inlineData.orderAmount }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ inlineData.orderState }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-dialog>

      <!-- 编辑信息 -->
      <el-dialog title="编辑订单" :visible.sync="dialogEditVisible" width="30%">
        
          <el-form label-position="right" :data="inlineData">
            <el-form-item label="订单ID">
              <el-col :span="12">
                <el-input v-model="inlineData.id"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="订单号">
              <el-col :span="12"
                ><el-input v-model="inlineData.orderNo"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="下单时间" prop="">
              <el-col :span="12"
                ><el-input v-model="inlineData.orderTime"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-col :span="12"
                ><el-input v-model="inlineData.phone"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="收货人">
              <el-col :span="12"
                ><el-input v-model="inlineData.consignee"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="收货地址">
              <el-col :span="12"
                ><el-input v-model="inlineData.deliverAddress"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="送达时间">
              <el-col :span="12"
                ><el-input v-model="inlineData.deliveryTime"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="备注">
              <el-col :span="12"
                ><el-input v-model="inlineData.remarks"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="订单金额">
              <el-col :span="12"
                ><el-input v-model="inlineData.orderAmount"></el-input
              ></el-col>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select
                v-model="inlineData.orderState"
                placeholder="请选择订单状态"
              >
                <el-option v-for="(item, index) in options"
                :key="index"
                  :value="item"
                  :label="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickConfirmEdit"
              >确 定</el-button
            >
          </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { orderList, orderDetail,editOrder } from "@/api/apis";
import { getChinaTime } from "@/utils/utils";

export default {
  data() {
    return {
      id: "",
      //订单号
      orderNo: "",
      //收货人
      consignee: "",
      //手机号
      phone: "",
      // 订单状态选项
      options: ["已完成", "派送中", "已受理", "全部"],
      // 订单状态
      orderState: "",
      // 日期
      date: [new Date("2018-9-18 00:00:00"), new Date()],
      // 加载时间
      loadDate: false,
      deliveryTime: "",
      //   分页组件
      // 数据数组
      gridData: [],
      // 本行数据
      inlineData: {},
      // 当前页
      currentpage: 1,
      // 每页显示条数
      pagesize: 5,
      // 每页显示条数数组
      pagesizes: [5, 10, 15],
      // 总条数
      total: 0,
      // 是否可以查看信息
      dialogViewVisible: false,
      // 是否可以编辑信息
      dialogEditVisible: false,
    };
  },
  created() {
    this.getOrderList();
  },

  methods: {
    // 获取订单列表
    getOrderList(paramsex) {
      orderList({
        currentPage: this.currentpage,
        pageSize: this.pagesize,
        ...paramsex,
      }).then((res) => {
        // console.log(res);

        for (let obj of res.data.data) {
          obj.deliveryTime = getChinaTime(obj.deliveryTime);
          obj.orderTime = getChinaTime(obj.orderTime);
        }

        this.gridData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 点击查询
    clickSearch() {
      let { orderNo, consignee, phone, orderState } = this;

      //额外参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date)
        paramsex.date = JSON.stringify([
          getChinaTime(this.date[0]),
          getChinaTime(this.date[1]),
        ]);

      this.paramsex = paramsex;

      this.getOrderList(this.paramsex);
    },
    // 点击切换条数
    handleSizeChange(newPageSize) {
      // 改变每页条数
      this.pagesize = newPageSize;
      // 渲染数据
      this.getOrderList();
    },
    // 点击切换页数
    handleCurrentChange(newCurrentPage) {
      // 改变当前页数
      this.currentpage = newCurrentPage;
      //   渲染数据
      this.getOrderList(this.paramsex);
    },
    // 点击查看订单
    clickViewOrder(scope) {
      this.dialogViewVisible = true;
      this.getInlineData(scope);
    },
    // 点击编辑订单
    clickEditOrder(scope) {
      this.dialogEditVisible = true;

      this.getInlineData(scope);

      // 深拷贝
      this.inlineData = { ...scope.row };
      // console.log(this.inlineData)

      
    },
    // 获取本行数据
    getInlineData(scope) {
      orderDetail(scope.row.id).then((res) => {
        let arr = res.data.data;

        arr.deliveryTime = getChinaTime(arr.deliveryTime);
        arr.orderTime = getChinaTime(arr.orderTime);

        this.inlineData = arr;
      });
    },
    // 点击确定修改
    clickConfirmEdit() {
      editOrder(this.inlineData).then(res =>{
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "系统提示：订单修改成功!",
          });

          this.getOrderList();
      // this.dialogEditVisible = false;
      }
      })

      
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  .demonstration {
    margin-right: 10px;
  }
  .el-button {
    margin-left: 10px;
  }
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  padding: 20px 0;
}
</style>