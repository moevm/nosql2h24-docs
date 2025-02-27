import { createRouter, createWebHistory } from 'vue-router';
import { fetchCheckAuth, fetchRefreshToken } from '@/api';
import { userStore } from '@/main';
import { useUserStore } from '@/stores/useUserStore';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/Main'),
    meta: { requiresAuth: true },
  },
  {
    path: '/document/:id/:versionId/:title',
    name: 'document',
    component: () => import('@/pages/Document'),

    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-document',
    name: 'add-document',
    component: () => import('@/pages/DocumentAdd'),

    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const response = await fetchCheckAuth();
    if (response.status === 200) {
      next()
    }
    if (response.status === 405) {
      next({ name: 'Login' });
    }
    if (response.status === 407) {
      const responseRefresh = await fetchRefreshToken();
      if (responseRefresh.status === 200) {
        next()
      } else {
        localStorage.removeItem('login');
        userStore.removeRole();
        userStore.removeId();
        next({ name: 'Login' });
      }
    }
  } else {
    next();
  }
});

export { routes };
export default router;