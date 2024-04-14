<script setup lang="ts">
import common from '../assets/naive-ui-theme-overrides.json';
import {
  ArrowDownCircleSharp,
  ArrowUpCircleSharp,
  RefreshOutline,
} from '@vicons/ionicons5';

const show = ref<boolean>(false);
</script>

<template>
  <div class="m-auto w-[70%] mt-16 mb-16 select-none">
    <n-space justify="end" class="mb-4">
      <n-button  round @click="show = !show">
        <template #icon>
          <RefreshOutline />
        </template>
        刷新
      </n-button>
    </n-space>
    <n-alert title="服务器状态" class="mb-4" type="info">本页面展示了执行各类任务节点的状态。通常情况下，采用批处理的方式进行任务的调度，当某个节点状态异常时，可能造成任务积压。</n-alert>
    <n-spin :show="show">
      <n-collapse>
        <n-collapse-item title="执行节点" name="1">
          <div>
          <n-list bordered>
            <n-list-item>
              <template #suffix>
                <n-icon size="24" color="#0e7a0d">
                  <ArrowUpCircleSharp />
                </n-icon>
              </template>
              <span>Jabuticaba</span>
            </n-list-item>
            <n-list-item>
              <template #suffix>
                <n-icon size="24" :color="common.common.errorColor">
                  <ArrowDownCircleSharp />
                </n-icon>
              </template>
              <span>Rambai</span>
            </n-list-item>
            <n-list-item>
              <template #suffix>
                <n-icon size="24" :color="common.common.errorColor">
                  <ArrowDownCircleSharp />
                </n-icon>
              </template>
              <span>Pouteria sapota</span>
            </n-list-item>
            <n-list-item>
              <template #suffix>
                <n-icon size="24" :color="common.common.errorColor">
                  <ArrowDownCircleSharp />
                </n-icon>
              </template>
              <span>Syzygium jambos</span>
            </n-list-item>

          </n-list>
          </div>
        </n-collapse-item>
        <n-collapse-item title="执行状态" name="2">
          <div>
          <n-list bordered>
            <n-list-item>
              <template #suffix>100 %</template>
              <span>执行程序解析成功率</span>
            </n-list-item>
            <n-list-item>
              <template #suffix>100 %</template>
              <span>SSO调用成功率</span>
            </n-list-item>
          </n-list>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-spin>
    <n-divider />

    <div>最近一次检查时间：2024年4月14日12点15分</div>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-list .n-list-item .n-list-item__suffix) {
  position: relative;
  text-align: right;
  flex: 1;
}

:deep(.n-icon) {
  vertical-align: middle;
}
</style>
