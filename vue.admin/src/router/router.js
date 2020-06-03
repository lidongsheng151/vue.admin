// 导入模块
// -----------------------------
import Vue from 'vue' //引入Vue实例化对象
import VueRouter from 'vue-router' //引入路由

//安装路由
// -----------------------------
Vue.use(VueRouter)

// 实例化路由 且传入各路由配置
// 路由配置 > 注意：考虑到单页面应用首屏加载过慢引发体验不好,此处采用路由懒加载机制，也可有效减小项目发布包体积；
// -----------------------------
const router = new VueRouter({
    routes: [
        // 路由参数配置    
        {
            path: '/',
            redirect:'/dashboard',
        },   
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/home'),
            meta: {
                title: '自述文件'
            },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },                
            ]
        }, 
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/common/login'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

// 路由拦截
// -----------------------------
router.beforeEach((to, from, next) => {
    if (!window.localStorage.getItem('key') && to.path !== '/login') { //如果没有登录 且要去的地址不是登录页
        next('/login')
    } else {
        window.document.title = `${to.meta.title} | 后台管理系统`; //设置当前页标题
        next()
    }
})

// 重写路由push 解决跳转同一个路由时报错问题
// -----------------------------
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


// 导出路由：用于将路由注入于Vue实例上-以便于全局使用路由（详见main.js）
// -----------------------------
export default router;