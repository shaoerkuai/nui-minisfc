<script setup lang="ts">
import PageHeader from './components/pageHeader.vue';
import PageBody from './components/pageBody.vue';
import PageFooter from './components/pageFooter.vue';
import themeOverrides from './assets/naive-ui-theme-overrides.json';
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
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
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
