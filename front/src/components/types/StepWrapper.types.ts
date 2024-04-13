import { StepsProps } from 'naive-ui';

interface IWrappedStepObject {
  stepStatus: StepsProps['status'];
  stepTitle: string;
  stepDescription: string;
}

/* 拷贝一份props的IWrappedStepObject部分字段到自己的ref实现步骤状态的双向绑定*/
interface StepModelProperties {
  stepNumber: number;
  stepStatus: StepsProps['status'];
}

export type { IWrappedStepObject, StepModelProperties };
