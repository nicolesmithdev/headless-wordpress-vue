import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/pages/home/Home';
import SinglePage from './components/SinglePage';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/:slug',
            name: 'page',
            component: SinglePage,
        },
        {
            path: '/:catchall(.*)',
            name: 'catchall',
            component: Home,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        window.history.scrollRestoration = 'manual';
        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ selector: to.hash, behavior: 'smooth' });
                }, 500);
            });
        }
        return savedPosition ? savedPosition : { x: 0, y: 0 };
    },
});

router.beforeEach(function(to, from, next) {
    if (from.name) {
        document.body.classList.remove(from.name);
    }
    if (to.name) {
        document.body.classList.add(to.name);
    }

    next();
});

export default router;
