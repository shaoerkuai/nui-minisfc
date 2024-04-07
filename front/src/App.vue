<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import PageBody from './components/PageBody.vue';
import PageFooter from './components/PageFooter.vue';
</script>

<template>
  <n-config-provider preflight-style-disabled>
    <n-message-provider>
      <n-modal-provider>
        <PageHeader />
        <PageBody />
        <PageFooter />
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
