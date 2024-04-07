<script setup lang="ts">
const loading = ref(false);
const alreadyReceived = ref(false)
function receiveCode() {
  loading.value = !loading.value;
  setTimeout(() => {
    loading.value = !loading.value;
    alreadyReceived.value = true
  }, 500);
}
</script>

<template>
  <div class="h-full max-h-full m-auto w-[30%] flex flex-col items-center">
    <div class="flex-1 flex items-center w-full">
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="登录">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input :disabled="alreadyReceived" placeholder="请输入用户名" />
              <div class="pl-2" v-if="!alreadyReceived" >
                <n-button :loading="loading" @click="receiveCode">获取验证码</n-button>
              </div>
            </n-form-item-row>
            <n-form-item-row label="验证码">
              <n-input type="text" />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong>登录</n-button>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-tabs {
  position: relative;

  .n-tabs-nav--bar-type {
    padding-left: 4px;
  }
}
</style>
