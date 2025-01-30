import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router';
import './style.css'
import App from './App.vue'

import Home from './views/Home.vue';
import Login from './views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

const app = createApp(App)

app.use(router)
app.mount('#app')
