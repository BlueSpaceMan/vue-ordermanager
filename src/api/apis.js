import axios from "axios";

// 请求基本路径
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 商品图片上传地址
export const GOODS_IMG_UPLOAD = axios.defaults.baseURL + '/goods/goods_img_upload'
// 获取当前商品图片地址
export const GET_GOODS_IMG_URL = axios.defaults.baseURL + '/upload/imgs/goods_img/'
// 账户头像上传地址
export const ACCOUNT_IMG_UPLOAD = axios.defaults.baseURL + '/users/avatar_upload'
// 获取店铺头像地址
export const GET_SHOPS_IMG = axios.defaults.baseURL + '/upload/shop/'
// 上传店铺头像地址
export const SHOPS_IMG_UPLOAD = axios.defaults.baseURL + '/shop/upload'


// 登录API
// account账号,password密码
    // es5
    // export function login(account,password){
    //    return axios.post('/users/checkLogin',{
    //         account,password
    //       })
    // }
// es6
export var login = (account,password) => axios.post('/users/checkLogin',{account,password})

// 验证token的API
// get传参需要带上params
export var checkToken = (token) => axios.get('/users/checktoken',{params: {token}})

// --------------------数据报表API-------------------- //
// 后台首页API
export var echartsTotalData = () => axios.get('/order/totaldata')
// 订单统计
export var echartsOrderData = (date) => axios.get('/order/ordertotal',{params:{date}})


// --------------------账号管理API-------------------- //
// 添加账号API
// account账号,password,密码,userGroup用户组
export var addAccount = (account,password,userGroup) => axios.post('/users/add',{account,password,userGroup})

// 账号列表API
// currentPage当前页,pageSize每页条数
export var accountList = (currentPage,pageSize) => axios.get('/users/list',{params: {currentPage,pageSize}})

// 删除用户API
export var deleteAccount = (id) => axios.get('/users/del',{params: {id}})

// 批量删除API
export var batchDeleteAccount = (ids) => axios.get('/users/batchdel',{params: {ids}})

// 修改账户API
export var editAccount = (id,account,userGroup) => axios.post('/users/edit',{id,account,userGroup})

// 获取账户信息API
export var accountInfo = (id) => axios.get('/users/accountinfo',{params: {id}})

// 确认旧密码API 
export var checkOldPwd = (id,oldPwd,) => axios.get('/users/checkoldpwd',{params: {id,oldPwd}})

// 修改密码API
export var changePwd = (id,newPwd) => axios.post('/users/editpwd',{id,newPwd})

// --------------------商品管理API-------------------- //
// 分类列表
export var goodsCateList = (currentPage,pageSize) => axios.get('/goods/catelist',{params: {currentPage,pageSize}})

// 修改分类API
export var editGoodsCate = (params) => axios.post('/goods/editcate',params)

// 删除分类API
export var deleteGoodsCate = (id) => axios.get('/goods/delcate',{params: {id}})

// 获取分类名API
export var goodsCateName = (id) => axios.get('/goods/categories')

// 添加分类API
export var addGoodsCate = (cateName,state) => axios.post('/goods/addcate',{cateName,state})

// 获取商品API
export var goodsList = (currentPage,pageSize) => axios.get('/goods/list',{params: {currentPage,pageSize}})

// 添加商品API
export var addGoods = (name,category,price,imgUrl,goodsDesc) => axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

// 删除商品API
export var deleteGoods = (id) => axios.get('/goods/del',{params: {id}})

// 修改商品API
export var editGoods = (params) => axios.post('/goods/edit',params)


// --------------------订单管理API-------------------- //
// 获取订单API
export var orderList = (params) => axios.get('/order/list',{ params })

// 获取订单详情API
export var orderDetail = (id) => axios.get('/order/detail',{ params:{id} })

// 修改订单API
export var editOrder = (params) => axios.post('/order/edit',params)


// --------------------店铺管理API-------------------- //
// 获取店铺信息
export var shopInfo = () => axios.get('/shop/info')

// 编辑店铺信息
export var editShops = (params) => axios.post('/shop/edit',params)

