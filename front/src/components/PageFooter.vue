<script setup lang="ts">
import { BalloonOutline } from '@vicons/ionicons5';
import { useModal } from 'naive-ui';
import { h } from 'vue';

const modal = useModal();
const contactInfo = () => {
  modal.create({
    title: '技术支持',
    content: () =>
      h('div', { class: 'contact-info' }, [
        h('span', null, '联系作者：test'),
        h('br'),
        h('span', null, 'QQ：test'),
      ]),
    preset: 'dialog',
  });
};
</script>

<template>
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
    >
      <span>1.0.0-661283dc96d8a335609a186d</span>
      <div>
        <n-button text @click="contactInfo">
          <template #icon>
            <n-icon>
              <BalloonOutline />
            </n-icon>
          </template>
          技术支持
        </n-button>
      </div>
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
