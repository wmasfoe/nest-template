export interface AuthUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserAuthRepository {
  findUserByEmail(email: string): Promise<AuthUser>;
  findUserByUsername(username: string): Promise<AuthUser>;
}
