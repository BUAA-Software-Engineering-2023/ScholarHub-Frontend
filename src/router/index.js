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
        {
            path: '/chat',
            name: "Chat",
            component: ()=> import("@/views/chat/Chat.vue")
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
                    component: ()=>import("@/views/detail/ResearcherPortal.vue")
                },
                {
                    path: 'institution/:institutionId',
                    name: 'InstitutionDetail',
                    component: ()=>import("@/views/detail/InstitutionDetail.vue")
                },
                {
                    path: 'concept/:conceptId',
                    name: 'ConceptDetail',
                    component: ()=>import("@/views/detail/ConceptDetail.vue")
                },
                {
                    path: 'user/collections',
                    name: 'Collections',
                    component:()=>import("@/views/user/Collection.vue"),
                    props: (route) => ({ query: route.query }) // 将查询字符串作为组件属性传递
                },
                {
                    path: 'user/information',
                    name: 'Information',
                    component:()=>import("@/views/user/Information.vue")
                },
                {
                    path: 'user/scholar',
                    name: 'scholar',
                    component:() =>import("@/views/user/AuthorDetail.vue")
                },
                {
                    path: 'user/history',
                    name:  "History",
                    component:()=>import("@/views/user/History.vue")
                },
                {
                    path: 'paper/:paperId',
                    name: 'PaperDetail',
                    component: ()=>import('../views/paper/Paper.vue'),
                },
            ]
        },
        // 管理端
        {
            path: '/search/article',
            name: 'SearchArticle',
            component: () => import('@/views/search/SearchArticle.vue')
        },{
            path: '/search/expert',
            name: 'SearchExpert',
            component: () => import('@/views/search/SearchArticle.vue')
        },{
            path: '/search/field',
            name: 'SearchField',
            component: () => import('@/views/search/SearchArticle.vue')
        },{
            path: '/search/institution',
            name: 'SearchInstitution',
            component: () => import('@/views/search/SearchArticle.vue')
        },{
            path: '/search/publisher',
            name: 'SearchPublisher',
            component: () => import('@/views/search/SearchArticle.vue')
        },{
            path: '/search/funder',
            name: 'SearchFunder',
            component: () => import('@/views/search/SearchArticle.vue')
        },{
            path: '/search/source',
            name: 'SearchSource',
            component: () => import('@/views/search/SearchArticle.vue')
        }
        ,{
            path: '/search/te',
            name: 'EchartsArticle',
            component: () => import('@/views/search/EchartsArticle.vue')
        },{
            path: '/admin',
            name: 'Admin',
            component: () => import('@/views/admin/Home.vue')
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
        return '/client';
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