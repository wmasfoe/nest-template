import { Request } from 'express';
import { AuthUser } from '../interfaces/user-repository.interface';
import type {
  JwtPayload,
  JwtUser,
  LoginResponse,
  LogoutResponse,
  ForceLogoutResponse,
  BlacklistStatistics,
  UserTokenCount,
} from '@packages/shared';

// 用户认证相关类型定义

// 用户登录后的安全用户信息（不包含密码）
export type SafeUser = Omit<AuthUser, 'password'>;

// 重新导出 shared 类型，保持向后兼容
export type {
  JwtPayload,
  JwtUser,
  LoginResponse,
  LogoutResponse,
  ForceLogoutResponse,
  BlacklistStatistics,
  UserTokenCount,
};

// Request 接口扩展
export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

export interface LoginRequest extends Request {
  body: {
    account: AuthUser['email'];
    password: AuthUser['password'];
  };
}
