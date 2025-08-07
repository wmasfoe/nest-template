import { SetMetadata } from '@nestjs/common';

export const UNIFIED_PAGINATION_RESPONSE_KEY = 'unified_pagination_response';

/**
 * 标记接口返回分页数据的装饰器
 * 用于在响应拦截器中识别分页接口
 */
export const UnifiedPaginationResponseDecorator = () =>
  SetMetadata(UNIFIED_PAGINATION_RESPONSE_KEY, true);
