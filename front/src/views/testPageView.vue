<script setup lang="ts">
import { ref } from 'vue';
import { IWrappedStepObject } from '../components/types/StepWrapper.types.ts';

const IWrappedStepObject_ = ref<Array<IWrappedStepObject>>([
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
</script>

<template>
  <StepWrapper
    :current-step="0"
    :max-step="4"
    :step-list="IWrappedStepObject_"
  />
</template>

<style scoped lang="scss"></style>
