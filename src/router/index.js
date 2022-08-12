import { checkToken } from '@/api/apis'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    // 懒加载，当hash被匹配成功时才会动态加载此页面 
    component: () => import('../pages/Main'),
    // 子路由
    children: [
      {
        // 后台系统的路由
        path: '/main/backgroundpage',
        name: '/main/backgroundpage',
        component: () => import('../pages/main/BackgroundPage')
      },
      {
        // 订单管理的路由
        path: '/main/ordermanage',
        name: '/main/ordermanage',
        component: () => import('../pages/main/OrderManage'),
        // 自定义数组
        meta: {
          breadcrumbList:['订单管理']
        }
      },
      {
        // 商品列表的路由
        path: '/main/goodslist',
        name: '/main/goodslist',
        component: () => import('../pages/main/goods/GoodsList'),
        meta:{
          breadcrumbList:['商品管理','商品列表']
        }
      },
      {
        // 添加商品的路由
        path: '/main/addgoods',
        name: '/main/addgoods',
        component: () => import('../pages/main/goods/AddGoods'),
        meta:{
          breadcrumbList:['商品管理','添加商品']
        }
      },
      {
        // 商品分类的路由
        path: '/main/goodsclassify',
        name: '/main/goodsclassify',
        component: () => import('../pages/main/goods/GoodsClassify'),
        meta:{
          breadcrumbList:['商品管理','商品分类']
        }
      },
      {
        // 店铺管理的路由
        path: '/main/storemanage',
        name: '/main/storemanage',
        component: () => import('../pages/main/StoreManage'),
        meta:{
          breadcrumbList:['店铺管理']
        }
      },
      {
        // 账户列表的路由
        path: '/main/accountlist',
        name: '/main/accountlist',
        component: () => import('../pages/main/account/AccountList'),
        meta:{
          breadcrumbList:['账号管理','账号列表']
        }
      },
      {
        // 添加账户的路由
        path: '/main/addaccount',
        name: '/main/addaccount',
        component: () => import('../pages/main/account/AddAccount'),
        meta:{
          breadcrumbList:['账号管理','添加账号']
        }
      },
      {
        // 修改密码的路由
        path: '/main/changepassword',
        name: '/main/changepassword',
        component: () => import('../pages/main/account/ChangePassword'),
        meta:{
          breadcrumbList:['账号管理','修改密码']
        }
      },
      {
        // 账户信息的路由
        path: '/main/accountinfo',
        name: '/main/accountinfo',
        component: () => import('../pages/main/account/AccountInfo'),
        meta:{
          breadcrumbList:['个人信息']
        }
      },
      {
        // 商品统计的路由
        path: '/main/goodsstatistic',
        name: '/main/goodsstatistic',
        component: () => import('../pages/main/sale/GoodsStatistic'),
        meta:{
          breadcrumbList:['销售统计','商品统计']
        }
      },
      {
        // 订单统计的路由
        path: '/main/orderstatistic',
        name: '/main/orderstatistic',
        component: () => import('../pages/main/sale/OrderStatistic'),
        meta:{
          breadcrumbList:['销售统计','订单统计']
        }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 切换路由之前拦截
router.beforeEach((to,from,next) => {
  // to 跳转到的路由，from 来自于，next 下一步

  // 只要不是默认登录，都开启路由验证
  if(to.path != '/'){
    // 验证用户是否登录
    checkToken(localStorage.token).then(res => {
      if(res.data.code == 0)
        // 登入状态，则放行
        next()
      else
        // 不在登入状态，则跳转到登录界面
        next('/')
    })
  }else 
  // 不是默认登录，则放行
  next()

})

export default router
