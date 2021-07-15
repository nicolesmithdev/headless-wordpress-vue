import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/pages/Home';
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
        component: SinglePage
      },
      {
        path: '/:catchall(.*)',
        name: 'catchall',
        component: Home
      }
    ]
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