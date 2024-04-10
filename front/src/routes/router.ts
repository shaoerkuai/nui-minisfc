import { useSessionStore } from '../store/sessionStore.ts';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/testPageView.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function inRoutes(name: string) {
  return routes.some((route) => {
    return route.name === name;
  });
}

function checkLogin() {
  const store = useSessionStore();
  if (store.isLogged()) {
    return true;
  } else {
    return localStorage.getItem('token') !== null;
  }
}

router.beforeEach(async (to, from) => {
  let isAuthenticated = checkLogin();
  if (!isAuthenticated && to.name !== 'login') {
    // 将用户重定向到登录页面
    (window as any).$message.error('请先完成登录');
    return { name: 'login' };
  }
  if (isAuthenticated && to.name == 'login') {
    // 防止重复登录
    (window as any).$message.error('请勿重复登录');
    return { name: 'home' };
  }
  // 如果访问的是不在路由内的页面，则直接跳转到首页
  if (!inRoutes(<string>to.name)) {
    (window as any).$message.error('访问的页面不存在，已跳转到首页');
    return { name: 'home' };
  }
});
export default router;
