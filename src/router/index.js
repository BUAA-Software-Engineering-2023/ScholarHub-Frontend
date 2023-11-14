import { createRouter, createWebHistory } from 'vue-router'
import {ElLoading} from "element-plus";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'Welcome',
            component:() => import('@/views/home/Welcome.vue'),
            meta: {
                no_login: true
            }
        },
        {
            path: '/login',
            name: "Login",
            component: ()=> import('@/views/account/Login.vue')
        },
        // 客户端
        {
            path: '/client',
            component: ()=>import('@/views/client/Index.vue'),
            meta:{
                requiresAdmin:false
            },
            children:[
                {
                    path: '',
                    name: 'Home',
                    component: ()=>import('@/views/home/Home.vue')
                },
                {
                    path: 'author/:authorId',
                    name: 'AuthorDetail',
                    component: ()=>import("@/views/Detail/ResearcherPortal.vue")
                }
            ]
        },
        // 管理端
        {
            path: ''
        }
]
})
let loading =  null;
router.beforeEach((to, from) => {
    loading = ElLoading.service({
        lock: true,
        spinner: 'el-icon-loading',
    });
    const token = localStorage.getItem('TOKEN');
    if (!to.meta.no_login && !token && to.path !== '/login') {
        // 如果没有登录且访问的不是 /login 路由或设置了 no_login 标记的路由，重定向到 /login
        return '/login';
    } else if (token && to.path === '/login' && from.path === '/') {
        return '/';
    }
    else if (token && to.path === '/login') {
        // 如果已登录但访问的是 /login 路由，重定向到上一个页面
        return false;
    }else if(token&&to.path==='/'){
        return '/client';
    }
    loading.close();
});
export default router;