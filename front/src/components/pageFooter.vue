<script setup lang="ts">
import { BulbOutline } from '@vicons/ionicons5';
import { useModal } from 'naive-ui';
import { h } from 'vue';
const app_version = __APP_VERSION__
const app_build_time = __APP_BUILD_TIME__
const modal = useModal();
const contactInfo = () => {
  modal.create({
    title: '技术支持',
    content: () =>
      h('div', { class: 'contact-info' }, [
        h('span', null, 'test'),
        h('br'),
        h('span', null, 'test'),
      ]),
    preset: 'dialog',
  });
};
</script>

<template>
  <n-popover placement="left-end" trigger="hover">
    <template #trigger>
      <n-float-button position="fixed" bottom="48px" right="20px" @click="contactInfo">
        <n-icon :size="24">
          <BulbOutline />
        </n-icon>
      </n-float-button>
    </template>
    <div>
      这是一个提示
    </div>
  </n-popover>

  <div
    class="fixed bottom-0 box-border w-full"
    style="
      height: var(--page-footer-height);
      border-top: 1px solid rgb(239, 239, 245);
      z-index: 1000;
      background: #fff;
    "
  >
    <div
      class="ml-4 h-full font-thin text-footer select-none flex items-center justify-between mr-4"
      style="font-size: 0.8rem"
    >
      <span> {{app_version}} (构建日期: {{ app_build_time}})</span>
    </div>
  </div>
</template>

<style lang="scss">
.contact-info {
  span {
    line-height: 36px;
  }
}
</style>
