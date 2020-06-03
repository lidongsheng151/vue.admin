import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js' //引入路由实例
import ElementUI from 'element-ui'; //引入UI实例
import 'element-ui/lib/theme-chalk/index.css'; //UI Style
import './assets/css/public.css' //公共样式

Vue.use(ElementUI) //安装UI框架

new Vue({
  router, //挂载路由
  render: h => h(App),
}).$mount('#app')

Vue.config.productionTip = false