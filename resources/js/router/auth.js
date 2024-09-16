import DefaultLayout from "../layouts/DefaultLayout.vue";
import SignInView from '../views/SignInView.vue';
import SignUpView from '../views/SignUpView.vue';

export default [
    {
        path: '/signin',
        name: 'sign-in',
        component: SignInView,
        meta: { layout: DefaultLayout }
    },
    {
        path: '/signup',
        name: 'sign-up',
        component: SignUpView,
        meta: { layout: DefaultLayout }
    },
]