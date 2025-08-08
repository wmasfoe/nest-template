import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../types/auth.types';

/**
 * CurrentUser 装饰器
 * 获取当前登录用户的完整信息
 *
 * @example
 * @Get('profile')
 * getProfile(@CurrentUser() user: JwtUser) {
 *   return user;
 * }
 */
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): JwtUser => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

/**
 * UserId 装饰器
 * 只获取当前登录用户的ID
 *
 * @example
 * @Get('my-posts')
 * getMyPosts(@UserId() userId: number) {
 *   return this.postsService.findByUserId(userId);
 * }
 */
export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.userId;
});

/**
 * UserEmail 装饰器
 * 只获取当前登录用户的邮箱
 *
 * @example
 * @Post('send-notification')
 * sendNotification(@UserEmail() email: string) {
 *   return this.emailService.sendNotification(email);
 * }
 */
export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.email;
});

/**
 * UserName 装饰器
 * 只获取当前登录用户的姓名
 *
 * @example
 * @Get('welcome')
 * getWelcome(@UserName() name: string) {
 *   return `Welcome, ${name}!`;
 * }
 */
export const UserName = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.name;
});

/**
 * ReqUser 装饰器 (别名)
 * 与 CurrentUser 功能相同，提供语义化的别名
 *
 * @example
 * @Get('profile')
 * getProfile(@ReqUser() user: JwtUser) {
 *   return user;
 * }
 */
export const ReqUser = CurrentUser;
