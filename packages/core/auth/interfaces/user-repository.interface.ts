import type { User } from '@packages/shared';

// AuthUser 扩展 shared User 类型，添加密码字段和 Date 类型
export interface AuthUser extends Omit<User, 'createdAt' | 'updatedAt'> {
  password: string;
  createdAt: Date; // 数据库层使用 Date 类型
  updatedAt: Date; // 数据库层使用 Date 类型
}

export interface IUserAuthRepository {
  findUserByEmail(email: string): Promise<AuthUser | null>;
}
