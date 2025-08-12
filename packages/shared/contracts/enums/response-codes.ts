/**
 * 响应状态码枚举
 * 基于现有的 ResponseStatusCodeEnum 扩展
 */
export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VALIDATION_FAILED = 422,
  INTERNAL_ERROR = 500,
}

/**
 * 响应消息映射
 * 提供中文错误提示
 */
export const ResponseMessage: Record<ResponseCode, string> = {
  [ResponseCode.SUCCESS]: '操作成功',
  [ResponseCode.CREATED]: '创建成功',
  [ResponseCode.BAD_REQUEST]: '请求参数错误',
  [ResponseCode.UNAUTHORIZED]: '未认证或权限不足',
  [ResponseCode.FORBIDDEN]: '禁止访问',
  [ResponseCode.NOT_FOUND]: '资源不存在',
  [ResponseCode.VALIDATION_FAILED]: '参数校验失败',
  [ResponseCode.INTERNAL_ERROR]: '服务器内部错误',
};
