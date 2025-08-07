import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/nestjs';
import { ErrorResponse } from '../dto/response.dto';

/**
 * 统一异常过滤器
 * 集成 Sentry 异常记录和统一响应格式
 */
@Catch()
export class UnifiedExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 🔥 关键：使用 @sentry/nestjs 记录异常，保持异常监控功能
    Sentry.captureException(exception, {
      tags: {
        component: 'UnifiedExceptionFilter',
        path: request.url,
        method: request.method,
      },
      extra: {
        userAgent: request.get('User-Agent'),
        ip: request.ip,
        query: request.query,
        params: request.params,
      },
    });

    let status: number;
    let message: string;
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = HttpStatus[status] || 'Unknown Error';
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const response = exceptionResponse as any;
        message = response.message || response.error || exception.message;
        error = response.error || HttpStatus[status] || 'Unknown Error';

        // 处理验证错误等数组形式的message
        if (Array.isArray(message)) {
          message = message.join(', ');
        }
      } else {
        message = exception.message;
        error = HttpStatus[status] || 'Unknown Error';
      }
    } else {
      // 未知错误
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error = 'Internal Server Error';

      if (exception instanceof Error) {
        message = exception.message || 'Internal server error';
      }
    }

    const errorResponse: ErrorResponse = {
      message,
      error,
      code: status,
      data: [],
      success: false,
    };

    response.status(status).json(errorResponse);
  }
}
