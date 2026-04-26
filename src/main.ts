import './style.css'
import { createApp } from 'vue'
import { createPinia} from 'pinia';
import App from './App.vue'
import router from "@/router.ts";

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')

const METRIKA_ID = 108437493;
type YmFn = (counterId: number, action: string, ...args: any[]) => void;

function whenYmReady(timeoutMs = 10_000): Promise<YmFn | null> {
    return new Promise((resolve) => {
        const started = Date.now();

        const tick = () => {
            const ymFn = (window as any).ym;
            if (typeof ymFn === "function") return resolve(ymFn);

            if (Date.now() - started > timeoutMs) return resolve(null);

            setTimeout(tick, 200);
        };

        tick();
    });
}

(async () => {
    const ymFn = await whenYmReady();
    if (!ymFn) return;

    setInterval(() => {
        if (document.visibilityState === "visible") {
            ymFn(METRIKA_ID, "reachGoal", "ping");
        }
    }, 30_000);
})();
