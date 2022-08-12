<template>
    <div>
        <!-- 日期查询 -->
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
          >查询</el-button
        >
      </div>
    </div>
</template>

<script>
    export default {
        
    }
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
</style>