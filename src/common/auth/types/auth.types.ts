import { User } from '@prisma/client';
import { Request } from 'express';

// 用户认证相关类型定义

// 用户登录后的安全用户信息（不包含密码）
export type SafeUser = Omit<User, 'password'>;

// JWT Token Payload
export interface JwtPayload {
  sub: number; // 用户ID
  name: string;
  email: string;
  iat?: number; // issued at
  exp?: number; // expires at
}

// JWT 验证后的用户信息
export interface JwtUser {
  userId: number;
  name: string;
  email: string;
}

// 登录响应
export interface LoginResponse {
  access_token: string;
}

// 登出响应
export interface LogoutResponse {
  message: string;
}

// 强制登出响应
export interface ForceLogoutResponse {
  message: string;
  revokedTokens: number;
}

// 黑名单统计信息
export interface BlacklistStatistics {
  totalBlacklistedTokens: number;
  totalUsers: number;
  userTokenCounts: Array<{
    userId: number;
    tokenCount: number;
  }>;
}

// 用户token统计
export interface UserTokenCount {
  userId: number;
  tokenCount: number;
}

// Request 接口扩展
export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

export interface LoginRequest extends Request {
  body: {
    account: User['email'];
    password: User['password'];
  };
}
