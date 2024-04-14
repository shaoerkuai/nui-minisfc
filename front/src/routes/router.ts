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

async function dispatchLoading(loading: boolean) {
  commonEvent.emit('routeLoading', loading);
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
      store.avatarLink = 'https://picsum.photos/200/300';
      store.logged = true;
      return true;
    } else {
      return false;
    }
  }
}

async function cancelRoutingPublishEvent(
  key: RouteRecordName | null | undefined,
) {
  ((window as any).$eventBus as Emitter<ICommonEvent>).emit(
    'abortRouting',
    key as string,
  );
}
// @ts-ignore
router.beforeEach(async (to, from) => {
  await dispatchLoading(true);

  let isAuthenticated = checkLogin();
  if (!isAuthenticated && to.name !== 'login') {
    // 将用户重定向到登录页面
    (window as any).$message.warning('请先完成登录');
    await cancelRoutingPublishEvent(from.name);
    return { name: 'login' };
  }
  if (isAuthenticated && to.name == 'login') {
    // 防止重复进入登录页面
    await cancelRoutingPublishEvent(from.name);
    if (from.name !== undefined) {
      (window as any).$message.warning('请勿重复登录，已跳转回源页面');
      return { name: from.name };
    } else {
      (window as any).$message.warning('请勿重复登录，已跳转回首页');
      return { name: 'home' };
    }
  }
  // 如果访问的是不在路由内的页面，则直接跳转到首页
  if (!inRoutes(<string>to.name)) {
    (window as any).$message.error('无效的页面请求');
    return { name: 'home' };
  }
});
router.afterEach(async () => {
  await dispatchLoading(false);
});
export default router;
