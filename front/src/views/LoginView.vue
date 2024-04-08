<script setup lang="ts">
const loading = ref(false);
const alreadyReceived = ref(false);
import { AlertCircle } from '@vicons/ionicons5';

function receiveCode() {
  loading.value = !loading.value;
  setTimeout(() => {
    loading.value = !loading.value;
    alreadyReceived.value = true;
  }, 500);
}
</script>

<template>
  <div class="h-full w-full absolute">
    <div
      class="relative -translate-y-[50%] w-[380px] top-[50%] left-[50%] -translate-x-[50%] overflow-hidden p-1"
    >
      <n-alert type="info" title="登录提示" :bordered="false" closable>
        请通过聊天软件接收登录验证码实现免密登录!
      </n-alert>

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
              <div class="pl-2" v-if="!alreadyReceived">
                <n-button :loading="loading" @click="receiveCode">
                  获取验证码
                </n-button>
              </div>
            </n-form-item-row>
            <n-form-item-row>
              <template #label>
                验证码
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <AlertCircle
                      class="inline-block h-4 w-4 outline-none align-bottom"
                    />
                  </template>
                  请通过 IM 收取验证码
                </n-tooltip>
              </template>
              <n-input type="text" placeholder="请输入6位验证码" />
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
