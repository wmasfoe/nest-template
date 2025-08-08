import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 导出用户相关装饰器
export { CurrentUser, UserId, UserEmail, UserName, ReqUser } from './current-user.decorator';
