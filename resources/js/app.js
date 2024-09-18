import './bootstrap';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css'

const pinia = createPinia();
const app = createApp(App);

pinia.use(({store}) => {
    store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService);

app.mount('#app');