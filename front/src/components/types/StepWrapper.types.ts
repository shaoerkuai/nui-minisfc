import { StepsProps } from 'naive-ui';

interface IWrappedStepObject {
  stepStatus: StepsProps['status'];
  stepTitle: string;
  stepDescription: string;
}

interface StepModelProperties {
  stepNumber: number;
  stepStatus: StepsProps['status'];
}

export type { IWrappedStepObject, StepModelProperties };
