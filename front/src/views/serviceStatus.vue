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
      <n-button round @click="show = !show">
        <template #icon>
          <RefreshOutline />
        </template>
        刷新
      </n-button>
    </n-space>
    <n-alert title="服务器状态" class="mb-4" type="info" closable>
      本页面展示了执行各类任务节点的状态。绿色代表节点空闲、黄色代表节点正在执行任务、红色代表节点离线。
    </n-alert>
    <n-spin :show="show">
      <n-collapse>
        <n-collapse-item title="节点" name="1">
          <div>
            <n-list bordered>
              <n-list-item>
                <template #suffix>
                  <n-icon size="24" color="#0e7a0d">
                    <ArrowUpCircleSharp />
                  </n-icon>
                </template>
                <span>Agent 01</span>
              </n-list-item>
              <n-list-item>
                <template #suffix>
                  <n-icon size="24" :color="common.common.errorColor">
                    <ArrowDownCircleSharp />
                  </n-icon>
                </template>
                <span>Agent 02</span>
              </n-list-item>
              <n-list-item>
                <template #suffix>
                  <n-icon size="24" :color="common.common.errorColor">
                    <ArrowDownCircleSharp />
                  </n-icon>
                </template>
                <span>Agent 03</span>
              </n-list-item>
              <n-list-item>
                <template #suffix>
                  <n-icon size="24" :color="common.common.warningColor">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                        opacity=".25"
                      />
                      <path
                        fill="currentColor"
                        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </svg>
                  </n-icon>
                </template>
                <span>Agent 04</span>
              </n-list-item>
            </n-list>
          </div>
        </n-collapse-item>
        <n-collapse-item title="服务" name="2">
          <div>
            <n-list bordered>
              <n-list-item>
                <template #suffix>100 %</template>
                <span>指标 1</span>
              </n-list-item>
              <n-list-item>
                <template #suffix>100 %</template>
                <span>指标 2</span>
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
