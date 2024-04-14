import { instance } from './instance.ts';

/* 检查远程信息 */
const validateConnectionInfo = (data: string) => {
  return instance.post('/api/v1/task/validateEnv', data);
};

/* 获取当前步骤 */
const getCurrentStep = (data: string) => {
  return instance.get(`/api/v1/task/currentStep?data=${data}`);
};

/* 获取当前步骤数据 */
const getCurrentStepData = (data: string) => {
  return instance.get(`/api/v1/task/currentStepData?data=${data}`);
};

/* 提交步骤 */
const submitStep1 = (data: string) => {
  return instance.get(`/api/v1/task/submitStep1?data=${data}`);
};

export {
  submitStep1,
  getCurrentStep,
  getCurrentStepData,
  validateConnectionInfo,
};
