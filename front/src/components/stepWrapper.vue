<script setup lang="ts">
import { IStepEventObject, stepEvent } from '../utils/mitt.ts';
import { ref } from 'vue';
import {
  IWrappedStepObject,
  StepModelProperties,
} from './types/stepWrapper.types.ts';
import Step1 from '../views/steps/step1.vue';
import Step2 from '../views/steps/step2.vue';
import Step3 from '../views/steps/step3.vue';
import Step4 from '../views/steps/step4.vue';

const props = defineProps<{
  maxStep: number;
  currentStep: number;
  stepList: IWrappedStepObject[];
}>();
// 当前步骤
const current = ref<number>(props.currentStep);
// 每个步骤序号的的状态
const stepModelList = ref<Array<StepModelProperties>>([]);
props.stepList.forEach((item: IWrappedStepObject, index) => {
  stepModelList.value?.push({
    stepNumber: index + 1,
    stepStatus: item.stepStatus,
  });
});
stepEvent.on('pushStep', (event: IStepEventObject) => {
  // 流程要求进入下一步
  current.value =
    event.prevStep >= props.maxStep ? props.maxStep : event.prevStep + 1;
    stepModelList.value[event.prevStep - 1].stepStatus = event.prevStepStatus;
    stepModelList.value[current.value - 1].stepStatus = event.targetStepStatus;
});
stepEvent.on('popStep', (event: IStepEventObject) => {
  // 流程要求回退一步
  current.value = event.prevStep <= 1 ? 1 : event.prevStep - 1;
    stepModelList.value[event.prevStep - 1].stepStatus = event.prevStepStatus;
    stepModelList.value[current.value - 1].stepStatus = event.targetStepStatus;
});
stepEvent.on('abort', (eventStep: number) => {
  // 流程终止
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
    <div class="mt-16 p-1 h-16 w-[95%] m-auto">
      <n-steps :current="current as number">
        <n-step
          v-for="(item, ind) in props.stepList"
          :title="item.stepTitle"
          :description="item.stepDescription"
          :status="stepModelList[ind].stepStatus"
        />
      </n-steps>
    </div>
    <div class="m-auto w-[60%]">
      <n-space justify="center" align="center" class="h-[480px] mt-16">
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
