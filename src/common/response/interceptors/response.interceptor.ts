import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { BaseResponse, PaginationData } from '../dto/response.dto';
import { ResponseStatusCodeEnum } from '../enums/response.enum';

/**
 * 统一响应拦截器
 * 用于包装所有成功响应为统一格式
 */
@Injectable()
export class UnifiedResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 检查是否已经是统一格式（避免重复包装）
        if (data && typeof data === 'object' && 'status' in data && 'success' in data) {
          return data;
        }

        // 检查是否是分页数据（基于toolkit的PaginationResponse格式）
        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          const paginationData: PaginationData = {
            tableResult: data.data,
            total: data.meta.total,
            pageNum: data.meta.page || data.meta.pageNum || 1,
            pageSize: data.meta.perPage || data.meta.pageSize || 10,
            extra: data.meta.extra || {},
          };

          const response: BaseResponse<PaginationData> = {
            data: paginationData,
            code: ResponseStatusCodeEnum.SUCCESS,
            success: true,
            message: 'success',
          };
          return response;
        }

        // 标准响应包装
        const response: BaseResponse = {
          data: data || {},
          code: ResponseStatusCodeEnum.SUCCESS,
          success: true,
          message: 'success',
        };

        return response;
      }),
    );
  }
}
