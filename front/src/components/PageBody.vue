<script setup lang="ts">
// isScrollable: 是否为带虚拟滚动条的视图，该视图下不能正常通过height进行居中，且强制设置height会导致滚动条无法正常展示，建议明显超长的页面使用
// 如果isScrollable是False，则可以参考TestView，实现子视图铺盖整个页面，根据需要在部分区域内使用虚拟滚动条。建议一般页面使用。
const prop = defineProps({
  isScrollable: { type: Boolean, required: true },
});
</script>

<template>
  <div
    :style="{
      position: 'relative',
      top: 'calc(var(--page-header-height))',
      height:
        'calc(100vh - var(--page-header-height) - var(--page-footer-height))',
    }"
  >
    <n-scrollbar
      :style="{
        maxHeight:
          'calc(100vh - var(--page-header-height) - var(--page-footer-height)))',
      }"
      v-if="prop.isScrollable"
    >
      <slot />
    </n-scrollbar>
      <slot v-else/>
  </div>
</template>

<style lang="scss">
</style>
