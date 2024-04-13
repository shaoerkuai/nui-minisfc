import { StepsProps } from 'naive-ui';

interface IWrappedStepObject {
  stepStatus: StepsProps['status'];
  stepTitle: string;
  stepDescription: string;
}

export type { IWrappedStepObject };
