<script setup lang="ts">
import { Component, h, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

import type { MenuOption } from 'naive-ui';
import { NAvatar, NIcon, NText, useMessage } from 'naive-ui';
import {
  BookOutline as BookIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5';
import { useSessionStore } from '../store/sessionStore.ts';

const route = useRouter();

const activeKey = ref(null);
const store = useSessionStore();
store.$subscribe(
  () => {
    // TODO init menu
  },
  { detached: true },
);

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
        h('div', null, [h(NText, { depth: 2 }, { default: () => '张三' })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => '软件开发部' }),
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
];
(window as any).$message = useMessage();

onMounted(() => {
  watch(
    () => route.currentRoute.value.name,
    (value) => {
      if (value !== undefined) {
        activeKey.value = value;
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
              v-model:value="activeKey"
              mode="horizontal"
              :options="menuOptions"
              responsive
            />
          </div>
        </div>
        <n-flex align="center">
          <n-dropdown :options="options">
            <n-avatar
              round
              size="medium"
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
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
