import { instance } from './instance.ts';

interface IUserLoginDto {
  username: string;
  verifyCode: string;
}

interface IUserGetCodeDto {
  username: string;
}

/* 发送验证码 */
export const sendCode = (data: IUserGetCodeDto) => {
  return instance.post('/api/v1/user/sendCode', JSON.stringify(data), {});
};
/* 登录获取JWT */
export const userLogin = (data: IUserLoginDto) => {
  return instance.post('/api/v1/user/login', JSON.stringify(data), {});
};

/* 用户头像 */
export const userAvatar = (data: IUserLoginDto) => {
  return instance.post('/api/v1/user/avatar', JSON.stringify(data), {});
};

export type { IUserLoginDto, IUserGetCodeDto };
