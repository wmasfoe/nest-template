import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from './services/blacklist.service';
import { AuthUser, IUserAuthRepository } from './interfaces/user-repository.interface';
import {
  SafeUser,
  JwtPayload,
  LoginResponse,
  LogoutResponse,
  ForceLogoutResponse,
  BlacklistStatistics,
} from './types/auth.types';
import { Inject } from '@nestjs/common';

import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserAuthRepository') private readonly userRepository: IUserAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly blacklistService: BlacklistService,
  ) {}

  // Passport本地策略使用的用户验证方法
  async validateUser(account: string, pass: string): Promise<SafeUser | null> {
    const user = await this.userRepository.findUserByEmail(account);
    if (user && user.password === pass) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }

  // 生成JWT token的方法
  async login(user: Pick<AuthUser, 'email' | 'password'>): Promise<LoginResponse> {
    const curUser = await this.validateUser(user.email, user.password);
    if (!curUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { sub: curUser.id, name: curUser.name, email: curUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('config.jwt.secret'),
        expiresIn: this.configService.get('config.jwt.expiresIn'),
      }),
    };
  }

  // 用户登出 - 将token加入黑名单
  async logout(token: string): Promise<LogoutResponse> {
    try {
      this.blacklistService.addToBlacklist(token);
      console.log('User logged out successfully', { tokenPrefix: token.substring(0, 20) + '...' });
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout failed', { error: error.message });
      throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 强制用户下线 - 将用户的所有token加入黑名单
  async forceLogoutUser(userId: number): Promise<ForceLogoutResponse> {
    try {
      const revokedTokens = this.blacklistService.blacklistUserTokens(userId);
      console.warn('User force logged out', { userId, revokedTokens });
      return {
        message: `User ${userId} has been forced to logout`,
        revokedTokens,
      };
    } catch (error) {
      console.error('Force logout failed', { userId, error: error.message });
      throw new HttpException('Force logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 获取黑名单统计信息
  getBlacklistStatistics(): BlacklistStatistics {
    return this.blacklistService.getStatistics();
  }

  // 保留原有的signIn方法作为兼容
  // async signIn(account: string, pass: string): Promise<{ token: string } | Error> {
  //   try {
  //     const user = await this.usersService.findUserByUsername(account);
  //     if (!user) {
  //       return new NotFoundException('User not found');
  //     }
  //     if (user.password !== pass) {
  //       return new UnauthorizedException('Invalid credentials');
  //     }
  //     const payload = { sub: user.id, name: user.name, email: user.email };

  //     const token = await this.jwtService.signAsync(payload, {
  //       secret: this.configService.get('config.jwt.secret'),
  //       expiresIn: this.configService.get('config.jwt.expiresIn'),
  //     });
  //     return { token };
  //   } catch (error) {
  //     return new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
