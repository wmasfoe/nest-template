import { ResponseStatusCodeEnum } from '../enums/response.enum';

/**
 * 基础响应结构
 */
export interface BaseResponse<T = any> {
  data: T;
  code: ResponseStatusCodeEnum;
  success: boolean;
  message: string;
}

/**
 * 分页数据结构
 */
export interface PaginationData<T = any> {
  tableResult: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  extra?: Record<string, any>;
}

/**
 * 统一分页响应结构
 */
export type UnifiedPaginationResponse<T = any> = BaseResponse<PaginationData<T>>;

/**
 * 错误响应结构
 */
export interface ErrorResponse {
  message: string;
  error: string;
  code: number;
  data: any[];
  success: false;
}
