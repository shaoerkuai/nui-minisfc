import LoginView from '../views/LoginView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { useSessionStore } from '../store/sessionStore.ts';

const routes = [{ path: '/login', name: 'login', component: LoginView }];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function inRoutes(name: string) {
  return routes.some((route) => {
    return route.name === name;
  });
}

router.beforeEach(async (to, from) => {
  const store = useSessionStore();
  let isAuthenticated = store.isLogged();
  if (!isAuthenticated && to.name !== 'login') {
    // 将用户重定向到登录页面
    return { name: 'login' };
  }
  console.log(inRoutes(<string>to.name));
});
export default router;
