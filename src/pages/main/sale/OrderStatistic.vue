<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickSearch" icon="el-icon-search"
        >查询数据</el-button
      >
    </div>
    <!-- Echarts表格 -->
    <div id="echartsTable"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { echartsOrderData } from "@/api/apis";
import { getChinaTime } from "@/utils/utils";

export default {
  data() {
    return {
      date: []
    };
  },
  methods: {
    // 点击查询数据
    clickSearch() {
      let timestr = JSON.stringify([
        getChinaTime(this.date[0]),
        getChinaTime(this.date[1])
      ]);
      this.refreshEcharts(timestr);
    },
    // 刷新Echarts数据
    refreshEcharts(str) {
      echartsOrderData(str).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinaTime(obj.orderTime);
        }
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          
          xAxis: [
            {
              type: "category",
              data: arr.map((obj) => obj.orderTime),
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: 
            {
              type: "value" 
          },
          series: [
            {
              name: "订单数",
              type: "bar",
              tooltip: {},
              data: arr.map((obj) => obj.orderAmount),
            }
          ]
        };
        this.echartsOrderStatic.setOption(option);
      });
    }
   
  },
   mounted() {
      this.echartsOrderStatic = echarts.init(
        document.getElementById("echartsTable")
      );
    }
};
</script>

<style lang="less" scoped>
.block {
  margin: 20px 0px;
  .demonstration {
    margin-right: 10px;
  }
  .el-button {
    margin-left: 10px;
  }
}
#echartsTable {
  width: 100%;
  height: 600px;
  background: #fff;
}
</style>