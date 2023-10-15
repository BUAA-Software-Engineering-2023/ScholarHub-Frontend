import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: ()=> import('../views/home/Home.vue')
        },
        {
            path: '/login',
            name: "Login",
            component: ()=> import('../views/account/Login.vue')
        }
]
})
export default router;