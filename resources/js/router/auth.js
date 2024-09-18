import DefaultLayout from "../layouts/DefaultLayout.vue";
import SignInView from '../views/auth/SignInView.vue';
import SignUpView from '../views/auth/SignUpView.vue';

export default [
    {
        path: '/signin',
        name: 'sign-in',
        component: SignInView,
        meta: { 
            layout: DefaultLayout,
            guest: true
        }
    },
    {
        path: '/signup',
        name: 'sign-up',
        component: SignUpView,
        meta: { 
            layout: DefaultLayout,
            guest: true
        }
    },
]