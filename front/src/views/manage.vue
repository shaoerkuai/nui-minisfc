<script setup lang="ts">
</script>

<template>
  <div class="relative w-[60%] m-auto mt-16 text-center">
    <span class="text-5xl">Debug Demo--管理demo</span>
    <n-space vertical class="mt-4">
      <n-form>
        <n-form-item-row label="用户名">
          <n-input></n-input>
        </n-form-item-row>
        <n-form-item-row label="流程ID（pk）">
          <n-input></n-input>
        </n-form-item-row>
        <n-form-item-row label="超级口令（必填）">
          <n-input type="password"></n-input>
        </n-form-item-row>
        <n-form-item-row label="step(当前步骤，如重置或者更新必填)">
          <n-input></n-input>
        </n-form-item-row>
        <n-form-item-row label="callback调用">
          <n-input></n-input>
        </n-form-item-row>
        <n-form-item-row>
          <n-space>
            <n-button>终止用户流程并发送中间消息通知</n-button>
            <n-button>重启流程1</n-button>
            <n-button>重启流程2</n-button>
            <n-button>重启流程3</n-button>
            <n-button>重置step状态为processing</n-button>
            <n-button>清理单个step数据</n-button>
            <n-button>清理后续step数据</n-button>
            <n-button>更新step</n-button>
            <n-button>callback</n-button>

          </n-space>
        </n-form-item-row>
      </n-form>
    </n-space>
  </div>
</template>

<style scoped lang="scss"></style>
