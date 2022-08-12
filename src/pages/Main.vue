<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="currentHash"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        router=""
        unique-opened
      >
        <!-- 可折叠菜单（数据驱动动态） -->
        <div v-for="(item, index) in powerarr" :key="index">
          <!-- 一级菜单 -->
          <!-- 判断是否有children对象确定为一二级菜单 -->
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>

          <!-- 包含二级菜单 -->
          <el-submenu :index="item.url" v-else>
            <!-- 一级标题 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!--  二级菜单 -->
            <el-menu-item
              v-for="(child, index) in item.children"
              :key="index"
              :index="child.url"
              >{{ child.name }}</el-menu-item
            >
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <!-- 左边面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main/backgroundpage' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
            >{{ item }}</el-breadcrumb-item
          >
        </el-breadcrumb>

        <div>
          <span class="name">{{ username }}</span>
          <img :src="imgUrl" alt="" @click="clickAccountInfo" />
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checkToken, accountInfo } from "@/api/apis";
export default {
  data() {
    return {
      // 用户名
      username: "",
      // 动态菜单的数据
      list: [
        // 后台首页
        {
          url: "/main/backgroundpage",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        // 订单管理
        {
          url: "/main/ordermanage",
          icon: "el-icon-tickets",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        // 商品管理（有二级菜单时，一级菜单的hash可以不用处理）
        {
          url: "/main/goodsmanage",
          icon: "el-icon-tickets",
          name: "商品管理",
          children: [
            // 商品列表
            { url: "/main/goodslist", name: "商品列表" },
            // 添加商品
            { url: "/main/addgoods", name: "添加商品" },
            // 商品分类
            { url: "/main/goodsclassify", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        // 店铺管理
        {
          url: "/main/storemanage",
          icon: "el-icon-shopping-cart-full",
          name: "店铺管理",
          roles: ["super"],
        },
        // 账号管理
        {
          url: "/main/accountmanage",
          icon: "el-icon-user",
          name: "账号管理",
          children: [
            // 账号列表
            { url: "/main/accountlist", name: "账号列表" },
            // 添加账号
            { url: "/main/addaccount", name: "添加账号" },
            // 修改密码
            { url: "/main/changepassword", name: "修改密码" },
          ],
          roles: ["super"],
        },
        // 销售统计
        {
          url: "/main/sellstatistic",
          icon: "el-icon-tickets",
          name: "销售统计",
          children: [
            // 商品统计
            { url: "/main/goodsstatistic", name: "商品统计" },
            // 订单统计
            { url: "/main/orderstatistic", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      // 面包屑菜单的数据
      breadcrumbList: [],
      // 当前hash值
      currentHash: "",
      // 头像的url
      imgUrl: "",
    };
  },
  computed: {
    // 权限数组
    powerarr() {
      // 根据用户权限，进行运算，返回运算后的数据

      // filter() es5写法
      // let newarr = this.list.filter((item) => {
      // 返回包含此用户权限的数据
      //   return item.roles.includes(localStorage.role)
      // })
      // return newarr;

      // es6
      return this.list.filter((item) => item.roles.includes(localStorage.role));
    },
  },
  methods: {
    // 点击跳转路由
    clickAccountInfo() {
      this.$router.push("/main/accountinfo");
    },
    // 刷新个人信息
    refreshAccountInfo() {
      // 获取个人信息
      accountInfo(localStorage.id).then((res) => {
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },
  },
  created() {
    // 获取当前页的hash
    this.currentHash = this.$route.path;

    // 发送请求，验证token是否过期
    checkToken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        // token有效
        this.username = `欢迎你，${localStorage.acc}!`;
      } else {
        // token无效
        this.username = "请前往登录！";
        this.$router.push = "/";
      }
    });

    this.refreshAccountInfo();

    // 监听bus的传递事件
    this.$bus.$on("imgUploadFinish", () => {
      this.refreshAccountInfo();
    });

    // 初始化给二级菜单赋值
    this.breadcrumbList = this.$route.meta.breadcrumbList;
  },
  // 观察vue多种属性的变化
  watch: {
    // to路由去到哪里；from路由来自哪里
    $route(to) {
      this.breadcrumbList = to.meta.breadcrumbList;
    },
  },
};
</script>

<style lang="less" scoped>
@sliderColor: #545c64;
@contentColor: #f0f2f5;
.el-container {
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    div {
      display: flex;
      align-content: center;
      justify-content: center;
      margin-right: 20px;
      .name {
        display: flex;
        margin-right: 15px;
        flex-direction: column;
        justify-content: center;
      }
      img {
        width: 45px;
        border-radius: 50%;
      }
    }
  }

  .el-aside {
    background-color: @sliderColor;
  }

  .el-main {
    background-color: @contentColor;
  }
  .el-menu {
    border: 0;
  }
}
</style>