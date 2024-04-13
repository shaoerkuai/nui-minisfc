<script setup lang="ts">
import { stepEvent } from '../../utils/mitt.ts';

const testFun = ()=>{
  stepEvent.emit('popStep', {
    prevStep: 3,
    prevStepStatus: 'wait',
    targetStepStatus: 'process',
  });
}
const testFu2 = ()=>{
  stepEvent.emit('pushStep', {
    prevStep: 3,
    prevStepStatus: 'finish',
    targetStepStatus: 'process',
  });
}
</script>

<template>
  <div>
    step3
    <n-button @click="testFun">pre</n-button>
    <n-button @click="testFu2">next</n-button>
  </div>
</template>
<style scoped lang="scss">

</style>