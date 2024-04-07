<script setup lang="ts"></script>

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
      >
        <div v-for="_ in 1">
          <br />
          sad
        </div>
      </n-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
