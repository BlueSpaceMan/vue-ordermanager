import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SlideVerify from 'vue-monoplasty-slide-verify'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(SlideVerify);
Vue.use(ElementUI)
// 创建全局bus，用来跨级传值
Vue.prototype.$bus = new Vue();


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
