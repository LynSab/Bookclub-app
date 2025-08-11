import { createWebHistory, createRouter } from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Clubs from './views/Clubs.vue';
import ClubView from './views/ClubView.vue';
import SignUp from './views/SignUp.vue';
import NewClub from './views/NewClub.vue';
import HomeContent from './views/HomeContent.vue';
import Account from './views/Account.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'clubs',
                name: 'Clubs',
                component: Clubs,
            },
            {
                path: '/',
                name: 'HomeContent',
                component: HomeContent,
            },
            {
              path: 'clubs/:clubId',
              name: 'ClubView',
              component: ClubView
            },
            {
                path: 'clubs/new',
                name: 'NewClub',
                component: NewClub
            },
            {
                path: 'account',
                name: 'Account',
                component: Account
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Sign-up',
        component: SignUp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router