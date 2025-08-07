import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseResponse, PaginationData } from '../dto/response.dto';
import { ResponseStatusCodeEnum } from '../enums/response.enum';

/**
 * 响应工具类
 * 提供便捷的响应创建方法
 */
export class ResponseUtils {
  /**
   * 创建成功响应
   */
  static success<T>(data: T, message = 'success'): BaseResponse<T> {
    return {
      data,
      code: ResponseStatusCodeEnum.SUCCESS,
      success: true,
      message,
    };
  }

  /**
   * 创建分页响应
   */
  static pagination<T>(
    tableResult: T[],
    total: number,
    pageNum: number,
    pageSize: number,
    extra?: Record<string, any>,
    message = 'success',
  ): BaseResponse<PaginationData<T>> {
    return {
      data: {
        tableResult,
        total,
        pageNum,
        pageSize,
        extra: extra || {},
      },
      code: ResponseStatusCodeEnum.SUCCESS,
      success: true,
      message,
    };
  }

  /**
   * 抛出HTTP异常（会被统一异常过滤器处理）
   */
  static throwError(message: string, statusCode = HttpStatus.BAD_REQUEST, error?: string): never {
    throw new HttpException(
      {
        message,
        error: error || HttpStatus[statusCode] || 'Bad Request',
      },
      statusCode,
    );
  }
}
