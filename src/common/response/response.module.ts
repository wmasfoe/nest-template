import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UnifiedResponseInterceptor } from './interceptors/response.interceptor';
import { UnifiedExceptionFilter } from './filters/unified-exception.filter';

/**
 * 统一响应模块
 * 提供全局的响应格式化拦截器和异常过滤器
 */
@Global()
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UnifiedResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: UnifiedExceptionFilter,
    },
    // 同时提供为常规服务，供其他地方使用
    UnifiedResponseInterceptor,
    UnifiedExceptionFilter,
  ],
  exports: [UnifiedResponseInterceptor, UnifiedExceptionFilter],
})
export class ResponseModule {}
