<script setup lang="ts">

</script>

<template>
<div class="full-view">
  <div class="view-container">
      <n-button class="flex-1">THIS IS BUTTON</n-button>
  </div>
</div>
</template>

<style scoped lang="scss">
.full-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  .view-container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
  }
}
</style>