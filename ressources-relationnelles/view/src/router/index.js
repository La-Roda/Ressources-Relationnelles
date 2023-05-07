import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/MyAccount.vue')
  },
  {
    path: '/myposts',
    name: 'myposts',
    component: () => import('../views/MyPosts.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const token = store.getters['getToken'];
  if (to.name !== 'login' && token === null) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
