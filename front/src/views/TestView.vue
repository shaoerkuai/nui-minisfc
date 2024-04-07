<script setup lang="ts">

</script>

<template>
<div class="full-view">
  <div class="view-container">
      <n-button class="flex-1">这是一个铺满容器的Button，当然你可以铺满别的东西</n-button>
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