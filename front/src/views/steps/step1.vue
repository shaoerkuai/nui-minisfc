<script setup lang="ts">
import { stepEvent } from '../../utils/mitt.ts';
import { getCurrentStep } from '../../api/taskAPI.ts';

const testFun = () => {
  stepEvent.emit('popStep', {
    prevStep: 1,
    prevStepStatus: 'wait',
    targetStepStatus: 'process',
  });
};
const testFu2 = () => {
  stepEvent.emit('pushStep', {
    prevStep: 1,
    prevStepStatus: 'finish',
    targetStepStatus: 'process',
  });
};
const testFunc3 = () => {
  getCurrentStep('111').then((v) => {
    console.log(v);
  });
};
</script>

<template>
  <div>
    step1
    <n-button @click="testFun">pre</n-button>
    <n-button @click="testFu2">next</n-button>
    <n-button @click="testFunc3">req</n-button>
  </div>
</template>
<style scoped lang="scss"></style>