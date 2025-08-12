/**
 * 用户相关类型定义和字段约束
 * 定义纯接口契约，不包含具体校验实现
 */

/**
 * 用户实体类型
 */
export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string; // ISO 字符串格式
  updatedAt: string; // ISO 字符串格式
}

/**
 * 创建用户请求类型
 */
export interface CreateUserRequest {
  name?: string;
  password: string;
  email: string;
}

/**
 * 更新用户请求类型
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

/**
 * 用户字段约束常量
 * 供前后端校验实现时参考
 */
export const USER_CONSTRAINTS = {
  name: {
    maxLength: 50,
    optional: true,
  },
  password: {
    minLength: 8,
    maxLength: 16,
    description: 'Must contain letters and numbers',
  },
  email: {
    format: 'email' as const,
    required: true,
  },
} as const;
