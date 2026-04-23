import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'homePageA',
            component: () => import('@/pages/homeA.vue'),
        },
        {
            path: '/home',
            name: 'homePageB',
            component: () => import('@/pages/homeB.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/about.vue')
        }
    ]
})

export default router