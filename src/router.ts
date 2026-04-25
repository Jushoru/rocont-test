import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'A',
            component: () => import('@/pages/homeA.vue'),
        },
        {
            path: '/home',
            name: 'B',
            component: () => import('@/pages/homeB.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/about.vue')
        }
    ]
})

function readVisited() {
    return localStorage.getItem("visited") === "true";
}
function readPage(): "A" | "B" | null {
    const p = localStorage.getItem("page");
    return p === "A" || p === "B" ? p : null;
}

router.beforeEach((to) => {
    const visited = readVisited();
    const page = readPage();

    if (!visited) {
        if (to.path !== "/about") return { path: "/about", replace: true };
        return true;
    }

    if (!page) {
        localStorage.removeItem("visited");
        localStorage.removeItem("page");
        if (to.path !== "/about") return { path: "/about", replace: true };
        return true;
    }

    if (page === "A" && to.path === "/home") return { path: "/", replace: true };
    if (page === "B" && to.path === "/") return { path: "/home", replace: true };

    return true;
});

export default router;