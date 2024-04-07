<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import PageBody from './components/PageBody.vue';
import PageFooter from './components/PageFooter.vue';
import TestView from './views/TestView.vue';
import ScrollBarView from './views/ScrollBarView.vue';
import {BulbOutline} from '@vicons/ionicons5'
</script>

<template>
  <n-config-provider preflight-style-disabled>
    <n-message-provider>
      <n-modal-provider>
        <PageHeader />
        <PageBody :is-scrollable="false">
          <template #default>
            <TestView />
          </template>
        </PageBody>
        <PageFooter />
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
