import { useSessionStore } from '../store/sessionStore.ts';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/common/loginView.vue'),
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
    let localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      store.name = '123';
      store.dept = '软考';
      store.logged = true;
      return true;
    } else {
      return false;
    }
  }
}

router.beforeEach(async (to) => {
  let isAuthenticated = checkLogin();
  if (!isAuthenticated && to.name !== 'login') {
    // 将用户重定向到登录页面
    (window as any).$message.error('请先完成登录后再使用');
    return { name: 'login' };
  }
  if (isAuthenticated && to.name == 'login') {
    // 防止重复进入登录页面
    (window as any).$message.error('请勿重复登录');
    return { name: 'home' };
  }
  // 如果访问的是不在路由内的页面，则直接跳转到首页
  if (!inRoutes(<string>to.name)) {
    (window as any).$message.error('无效页面请求');
    return { name: 'home' };
  }
});
export default router;
