import { useSessionStore } from '../store/sessionStore.ts';
import {
  createRouter,
  createWebHashHistory,
  RouteRecordName,
} from 'vue-router';
import { Emitter } from 'mitt';
import { commonEvent, ICommonEvent } from '../utils/mitt.ts';

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
  {
    path: '/status',
    name: 'status',
    component: () => import('../views/serviceStatus.vue'),
  },
  {
    path: '/private/manage',
    name: 'privateManagement',
    component: () => import('../views/manage.vue'),
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

function dispatchLoading(loading: boolean) {
  commonEvent.emit('routeLoading',loading)
}

function checkLogin() {
  const store = useSessionStore();
  if (store.isLogged()) {
    return true;
  } else {
    let localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      store.name = 'router.checkLogin';
      store.dept = 'router.dept';
      store.logged = true;
      return true;
    } else {
      return false;
    }
  }
}

function cancelRoutingPublishEvent(key: RouteRecordName | null | undefined) {
  ((window as any).$eventBus as Emitter<ICommonEvent>).emit(
    'abortRouting',
    key as string,
  );
}

router.beforeEach(async (to, from) => {
  dispatchLoading(true);
  let isAuthenticated = checkLogin();
  if (!isAuthenticated && to.name !== 'login') {
    // 将用户重定向到登录页面
    (window as any).$message.error('请先完成登录后再使用');
    cancelRoutingPublishEvent(from.name);
    return { name: 'login' };
  }
  if (isAuthenticated && to.name == 'login') {
    // 防止重复进入登录页面
    (window as any).$message.warning('请勿重复登录，已跳转至首页');
    cancelRoutingPublishEvent(from.name);
    return { name: 'home' };
  }
  // 如果访问的是不在路由内的页面，则直接跳转到首页
  if (!inRoutes(<string>to.name)) {
    (window as any).$message.error('无效页面请求');
    return { name: 'home' };
  }
});
router.afterEach(() => {
  dispatchLoading(false);
});
export default router;
