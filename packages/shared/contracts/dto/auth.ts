/**
 * 认证相关类型定义
 * 从 packages/core/auth/types 中抽离与框架无关的纯类型
 */

/**
 * JWT Token Payload
 */
export interface JwtPayload {
  sub: number; // 用户ID
  name: string;
  email: string;
  iat?: number; // issued at
  exp?: number; // expires at
}

/**
 * JWT 验证后的用户信息
 */
export interface JwtUser {
  userId: number;
  name: string;
  email: string;
}

/**
 * 登录请求类型
 */
export interface LoginRequest {
  account: string; // 邮箱
  password: string;
}

/**
 * 强制登出响应
 */
export interface ForceLogoutResponse {
  message: string;
  revokedTokens: number;
}

/**
 * 黑名单统计信息
 */
export interface BlacklistStatistics {
  totalBlacklistedTokens: number;
  totalUsers: number;
  userTokenCounts: Array<{
    userId: number;
    tokenCount: number;
  }>;
}

/**
 * 用户token统计
 */
export interface UserTokenCount {
  userId: number;
  tokenCount: number;
}
