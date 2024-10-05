import './bootstrap';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css';
import { useToast } from 'primevue/usetoast';

const pinia = createPinia();
const app = createApp(App);

pinia.use(({store}) => {
    const toast = useToast();
    
    store.router = markRaw(router);
    store.toast = markRaw(toast)
});

app.use(pinia);
app.use(router);
app.use(ToastService);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');