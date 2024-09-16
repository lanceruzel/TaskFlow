import './bootstrap';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');