<script setup lang="ts">
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
//.n-scrollbar-content {
//  height: 100%;
//}
</style>
