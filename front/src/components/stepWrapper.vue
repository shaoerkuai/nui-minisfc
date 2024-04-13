<script setup lang="ts">
import { IStepEventObject, stepEvent } from '../utils/mitt.ts';
import { ref } from 'vue';
import { IWrappedStepObject } from './types/StepWrapper.types.ts';
import Step1 from '../views/steps/step1.vue';
import Step2 from '../views/steps/step2.vue';
import Step3 from '../views/steps/step3.vue';
import Step4 from '../views/steps/step4.vue';

const maxStep = 4;
const current = ref<number>(1);
const stepModelList = ref<Array<IWrappedStepObject>>([
  {
    stepStatus: 'process',
    stepTitle: '任务标题1',
    stepDescription: '任务描述1',
  },
  {
    stepStatus: 'wait',
    stepTitle: '任务标题2',
    stepDescription: '任务描述2',
  },
  {
    stepStatus: 'wait',
    stepTitle: '任务标题3',
    stepDescription: '任务描述3',
  },
  {
    stepStatus: 'wait',
    stepTitle: '任务标题4',
    stepDescription: '任务描述任务描述4任务描述4任务描述4任务描述44',
  },
]);
stepEvent.on('pushStep', (event: IStepEventObject) => {
  // TODO 优化下逻辑
  current.value = event.prevStep >= maxStep ? maxStep : event.prevStep + 1;
  stepModelList.value[event.prevStep - 1].stepStatus = event.prevStepStatus;
  stepModelList.value[current.value - 1].stepStatus = event.targetStepStatus;
});
stepEvent.on('popStep', (event: IStepEventObject) => {
  current.value = event.prevStep <= 1 ? 1 : event.prevStep - 1;
  stepModelList.value[event.prevStep - 1].stepStatus = event.prevStepStatus;
  stepModelList.value[current.value - 1].stepStatus = event.targetStepStatus;
});
stepEvent.on('abort', (eventStep: number) => {
  // 任务终止
  stepModelList.value[eventStep].stepStatus = 'error';
});

/* 读取当前用户所处流程 */
function initStepData() {
  let tmp = 1; // 当前步骤
  // error" | "wait" | "finish" | "process
  let tmp2 = 'process'; // 步骤状态
  current.value = tmp;
  stepModelList.value.every((item, index) => {
    if (index + 1 < tmp) {
      item.stepStatus = 'finish';
    } else if (index + 1 === tmp) {
      // 当前步骤
      (item.stepStatus as string) = tmp2;
    } else {
      item.stepStatus = 'wait';
    }
    return true;
  });
}

onMounted(() => {
  initStepData();
});
</script>

<template>
  <div>
    <div class="mt-16 p-1 h-16 w-[95%] m-auto rounded">
      <n-steps :current="current as number">
        <n-step
          v-for="(item, _) in stepModelList"
          :title="item.stepTitle"
          :description="item.stepDescription"
          :status="item.stepStatus"
        />
      </n-steps>
    </div>
    <div class="m-auto w-[60%]">
      <n-space justify="center" align="center" class="h-[480px] mt-16"
      >
        <transition name="scale" mode="out-in">
        <div v-if="current == 1">
          <step1 />
        </div>
        <div v-else-if="current == 2">
          <step2 />
        </div>
        <div v-else-if="current == 3">
          <step3 />
        </div>
        <div v-else-if="current == 4">
          <step4 />
        </div>
        <div v-else>
          <n-result title="请稍后" description="获取当前任务进度中">
            <template #icon>
              <n-spin size="large" />
            </template>
          </n-result>
        </div>
        </transition>
      </n-space>

    </div>
  </div>
</template>

<style scoped lang="scss"></style>
