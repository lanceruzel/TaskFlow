import { createRouter, createWebHistory } from 'vue-router';
import NotFoundView from '../views/NotFoundView.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import authRoutes from './auth';
import homeRoutes from './home';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: 'active',
    routes: [
        ...authRoutes,
        ...homeRoutes,
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
            meta: { layout: DefaultLayout },
        },
    ]
});

export default router;