<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import {
  BookOutline as BookIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5';

import { useSessionStore } from '../store/sessionStore.ts';
import { RouterLink } from 'vue-router';

const route = useRouter();
(window as any).$message = useMessage();

interface IUserInfo {
  call: string;
  department: string;
  avatar: string;
}

const activeKey = ref<string | null>(null);
const store = useSessionStore();
const userInfo = ref<IUserInfo>({
  call: '你好',
  department: '软件开发部',
  avatar:
    'https://fastly.picsum.photos/id/1/100/100.jpg?hmac=ZFE9J9JWYx84uJzvjw4GTuagMzN4FAmaKE4XeJDMZTY',
});
store.$subscribe(
  () => {
    // TODO init menu
  },
  { detached: true },
);

async function fetchUserInfo() {
  // TODO fetch user info
  userInfo.value.call = '获取后';
  userInfo.value.department = '获取后';
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

const options = [
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader,
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
];

const menuOptions: MenuOption[] = [
  {
    label: () => renderRouterLink('login', '登录'),
    key: 'login',
    icon: renderIcon(BookIcon),
  },
  {
    label: () => renderRouterLink('home', '家里'),
    key: 'home',
    icon: renderIcon(BookIcon),
  },
];

function handleSelect(key: string | number) {
  if (key === 'logout') {
    // TODO MODIFY STORE & LOCALSTORAGE
    (window as any).$message.error('已经退出登录');
  }
}

onMounted(() => {
  fetchUserInfo();
  watch(
    () => route.currentRoute.value.name,
    (value) => {
      if (value !== undefined) {
        activeKey.value = String(value);
      }
      console.log(value);
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
              v-model:value="activeKey"
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
