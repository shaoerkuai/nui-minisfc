<script setup lang="ts">
import { FormInst } from 'naive-ui';
import { useSessionStore } from '../../store/sessionStore.ts';
import { AlertCircle } from '@vicons/ionicons5';

const loading = ref(false);
const alreadyReceived = ref(false);

const store = useSessionStore();
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const loginFormValue = ref({
  username: '',
  verifyCode: '',
});
const rules = {
  username: {
    key: 'u',
    required: true,
    message: '请输入正确的小写英文字母用户名',
    validator(_: any, value: string) {
      if (value.length < 1 || !/[a-z0-9]+$/.test(value)) {
        return new Error('wrong code');
      }
      return true;
    },

    trigger: ['input', 'blur'],
  },
  verifyCode: {
    required: true,
    message: '请输入正确的验证码',
    validator(_: any, value: string) {
      if (value.length !== 6 || !/^\d*$/.test(value)) {
        return new Error('wrong code');
      }
      return true;
    },
    trigger: ['input', 'blur'],
  },
};

function receiveCode() {
  formRef.value
    ?.validate(
      (errors) => {
        if (!errors) {
          loading.value = !loading.value;
          setTimeout(() => {
            alreadyReceived.value = true;
            loading.value = !loading.value;
          }, 2000);
        }
      },
      (rule) => {
        return rule?.key === 'u';
      },
    )
    .finally(() => {});
}

async function validate() {
  let validateRes: boolean = false;
  if (formRef.value) {
    await formRef.value
      ?.validate((errors) => {
        if (!errors) {
          validateRes = true;
        } else {
          message.error('请检查输入项是否正确');
          validateRes = false;
        }
      })
      .catch(() => {});
  }
  return validateRes;
}

async function login(e: Event) {
  e.preventDefault();
  if (await validate()) {
    setTimeout(() => {
      store.logged = true;
      store.dept = 'IT Test';
      store.name = 'Jacob';
      message.success('登录成功');
    }, 500);
  }
}
</script>

<template>
  <div class="h-full w-full absolute">
    <div class="login-panel p-1">
      <n-alert type="info" title="登录提示" :bordered="false" closable>
        现已支持免密验证码登录，验证码30分钟内有效。
      </n-alert>

      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="验证码登录">
          <n-form ref="formRef" :model="loginFormValue" :rules="rules">
            <n-form-item-row label="用户名" required path="username">
              <n-input
                v-model:value="loginFormValue.username"
                :disabled="alreadyReceived"
                placeholder="请输入用户名"
              />
              <div class="pl-2" v-if="!alreadyReceived">
                <n-button :loading="loading" @click="receiveCode">
                  获取验证码
                </n-button>
              </div>
            </n-form-item-row>
            <n-form-item-row path="verifyCode">
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
              <n-input
                v-model:value="loginFormValue.verifyCode"
                type="text"
                placeholder="请输入6位验证码"
              />
            </n-form-item-row>
          </n-form>
          <n-button
            type="primary"
            attr-type="button"
            block
            secondary
            strong
            :loading="loading"
            @click="login"
          >
            登录
          </n-button>
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

.login-panel {
  position: relative;
  width: 380px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 4px;
}
</style>
