/**
 * 统一响应结构类型定义
 * 基于现有后端响应拦截器的格式
 */

export interface BaseResponse<T = any> {
  data: T;
  code: number;
  success: boolean;
  message: string;
}

/**
 * 分页数据结构
 * 与现有后端 PaginationData 保持一致
 */
export interface PaginationData<T = any> {
  tableResult: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  extra?: Record<string, any>;
}

/**
 * 分页响应类型
 */
export type PaginationResponse<T> = BaseResponse<PaginationData<T>>;

/**
 * 错误响应结构
 * 与现有异常过滤器输出格式一致
 */
export interface ErrorResponse {
  message: string;
  error: string;
  code: number;
  data: any[];
  success: false;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  access_token: string;
}

/**
 * 登出响应
 */
export interface LogoutResponse {
  message: string;
}
