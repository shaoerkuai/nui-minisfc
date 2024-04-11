<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import PageBody from './components/PageBody.vue';
import PageFooter from './components/PageFooter.vue';
import themeOverrides from './assets/naive-ui-theme-overrides.json'
</script>

<template>
  <n-config-provider preflight-style-disabled :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-modal-provider>
        <PageHeader />
        <PageBody :is-scrollable="false">
          <template #default>
            <router-view></router-view>
          </template>
        </PageBody>
        <PageFooter />
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
