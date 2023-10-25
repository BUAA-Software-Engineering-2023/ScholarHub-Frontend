import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'Welcome',
            component:() => import('../views/home/Welcome.vue')
        },
        {
            path: '/login',
            name: "Login",
            component: ()=> import('../views/account/Login.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: ()=> import('../views/home/Home.vue')
        }
]
})
export default router;