<script setup lang="ts">
import type { DropdownOption, MenuOption } from 'naive-ui';
import {
  BookOutline as BookIcon,
  LogOutOutline as LogoutIcon,
  LogInOutline as LogInIcon,
} from '@vicons/ionicons5';

import { useSessionStore } from '../store/sessionStore.ts';
import { RouterLink } from 'vue-router';
import { commonEvent } from '../utils/mitt.ts';
import { Component } from 'vue';

const route = useRouter();
(window as any).$message = useMessage();
(window as any).$eventBus = commonEvent;

interface IUserInfo {
  logged: boolean;
  call: string;
  department: string;
  avatar: string;
}

const activeKey = ref<string | null>(null);
const store = useSessionStore();
const userInfo = ref<IUserInfo>({
  logged: false,
  call: '匿名用户',
  department: '--',
  avatar:
    '',
});
store.$subscribe(
  () => {
    userInfo.value.call = store.name;
    userInfo.value.department = store.dept;
    userInfo.value.avatar = store.avatarLink;
    userInfo.value.logged = store.logged;
    if (!store.isLogged()) {
      options.value =  options.value.filter((item) => item.key !== 'logout');
    } else {
      options.value.push({
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon),
      });
    }
  },
  { detached: true },
);

async function fetchUserAvatarLink() {
  // TODO fetch user avatar
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function renderRouterLink(viewName: string, label: string) {
  return h(RouterLink, { to: { name: viewName } }, { default: () => label });
}

function renderCustomHeader() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
    },
    [
      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => userInfo.value.call }),
        ]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => userInfo.value.department }),
        ]),
      ]),
    ],
  );
}

const options = ref<Array<DropdownOption>>([
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader,
  },
]);

const menuOptions: MenuOption[] = [
  {
    label: () => renderRouterLink('login', '登录'),
    key: 'login',
    icon: renderIcon(LogInIcon),
  },
  {
    label: () => renderRouterLink('home', '家里'),
    key: 'home',
    icon: renderIcon(BookIcon),
  },
];

function handleSelect(key: string | number) {
  if (key === 'logout') {
    (window as any).$message.error('已退出当前账号');
    localStorage.removeItem('token');
    store.clearState();
    route.push({ name: 'login' });
  }
}
commonEvent.on('abortRouting', (key: string) => {
  activeKey.value = key;
});
onMounted(() => {
  fetchUserAvatarLink();
  watch(
    () => route.currentRoute.value.name,
    (value) => {
      if (value !== undefined) {
        activeKey.value = String(value);
      }
    },
    { immediate: true, deep: true },
  );
});
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header
      :style="{
        height: 'var(--page-header-height)',
        padding: '0 var(--page-header-padding)',
        position: 'fixed',
        zIndex: 1,
      }"
      bordered
    >
      <div class="nav-bar">
        <div>Title</div>
        <div style="overflow: hidden; width: 100%">
          <div>
            <n-menu
              :value="activeKey"
              mode="horizontal"
              :options="menuOptions"
              responsive
            />
          </div>
        </div>
        <n-flex align="center">
          <n-dropdown :options="options" @select="handleSelect">
            <n-avatar round size="medium" :src="userInfo.avatar" />
          </n-dropdown>
        </n-flex>
      </div>
    </n-layout-header>
  </n-layout>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
</style>
