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

type PageGroup = "A" | "B";

function pickAB(): PageGroup {
    return Math.random() < 0.5 ? "A" : "B";
}

function readVisited(): boolean {
    return localStorage.getItem("visited") === "true";
}

function readPage(): PageGroup | null {
    const p = localStorage.getItem("page");
    return p === "A" || p === "B" ? p : null;
}

function ensurePageAssigned(): PageGroup {
    const existing = readPage();
    if (existing) return existing;

    const page = pickAB();
    localStorage.setItem("page", page);
    return page;
}

router.beforeEach((to) => {
    // назначаем A/B на старте приложения (если ещё нет)
    const page = ensurePageAssigned();
    const visited = readVisited();

    // Группа A: сразу на "/", about/home запрещены
    if (page === "A") {
        if (to.path !== "/") return { path: "/", replace: true };
        return true;
    }

    // Группа B:
    // - первый заход: /about
    // - после "Начать работу": /home
    if (!visited) {
        if (to.path !== "/about") return { path: "/about", replace: true };
        return true;
    }

    // visited=true
    if (to.path !== "/home") return { path: "/home", replace: true };
    return true;
});

export default router;