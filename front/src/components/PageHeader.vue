<script setup lang="ts">
import { Component, h, ref } from 'vue';

import { MenuOption, NAvatar, NIcon, NText, useMessage } from 'naive-ui';
import {
  BookOutline as BookIcon,
  LogOutOutline as LogoutIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5';

const activeKey = ref(null);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
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
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer',
        },
        '且听风吟',
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
    disabled: true,
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
];

(window as any).$message = useMessage();
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header
      :style="{
        height: 'var(--page-header-height)',
        padding: '0 var(--page-header-padding)',
        position:'fixed',
        zIndex:1
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
