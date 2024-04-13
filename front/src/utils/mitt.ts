import mitt, { Emitter } from 'mitt';

/*
 * 全局事件*/
type ICommonEvent = {
  abortRouting: string; // 取消路由。值为原 key
};

/*
步骤事件
*/
type IStepEvent = {
  pushStep: IStepEventObject; // 下一步
  popStep: IStepEventObject; // 上一步
  abort: number; // 终止，传当前步骤id
};

interface IStepEventObject {
  // 当前的步骤
  prevStep: number;
  // 上一步的状态
  prevStepStatus: 'error' | 'process' | 'wait' | 'finish';
  // 目标步骤的状态
  targetStepStatus: 'error' | 'process' | 'wait' | 'finish';
}

export const stepEvent: Emitter<IStepEvent> = mitt<IStepEvent>();
export const commonEvent: Emitter<ICommonEvent> = mitt<ICommonEvent>();
export type { IStepEvent, ICommonEvent, IStepEventObject };
