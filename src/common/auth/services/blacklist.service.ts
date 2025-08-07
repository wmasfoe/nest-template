import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlacklistStatistics, JwtPayload } from '../types/auth.types';

@Injectable()
export class BlacklistService {
  private blacklistedTokens = new Set<string>();
  private userTokens = new Map<number, Set<string>>(); // userId -> Set<token>

  constructor(
    private readonly jwtService: JwtService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  /**
   * 将token加入黑名单
   */
  addToBlacklist(token: string): void {
    try {
      const decoded = this.jwtService.decode(token) as JwtPayload;
      if (decoded?.exp) {
        this.blacklistedTokens.add(token);

        // 记录用户token映射
        if (decoded.sub) {
          if (!this.userTokens.has(decoded.sub)) {
            this.userTokens.set(decoded.sub, new Set());
          }
          this.userTokens.get(decoded.sub)?.add(token);
        }

        // 设置定时清理，在token过期后自动删除
        const expiryTime = decoded.exp * 1000 - Date.now();
        if (expiryTime > 0) {
          setTimeout(() => {
            this.blacklistedTokens.delete(token);
            if (decoded.sub) {
              this.userTokens.get(decoded.sub)?.delete(token);
            }
            this.logger.log(
              `Token ${token.substring(0, 20)}... automatically removed from blacklist after expiry`,
            );
          }, expiryTime);
        }

        this.logger.log('Token added to blacklist', {
          userId: decoded.sub,
          tokenPrefix: token.substring(0, 20) + '...',
        });
      }
    } catch (error) {
      this.logger.error('Failed to add token to blacklist', {
        error: error.message,
        tokenPrefix: token.substring(0, 20) + '...',
      });
    }
  }

  /**
   * 检查token是否在黑名单中
   */
  isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  /**
   * 将用户的所有token加入黑名单（强制用户下线）
   */
  blacklistUserTokens(userId: number): number {
    const userTokenSet = this.userTokens.get(userId);
    let count = 0;

    if (userTokenSet) {
      userTokenSet.forEach((token) => {
        this.blacklistedTokens.add(token);
        count++;
      });

      this.logger.log('All user tokens blacklisted', {
        userId,
        tokenCount: count,
      });
    }

    return count;
  }

  /**
   * 获取黑名单统计信息
   */
  getStatistics(): BlacklistStatistics {
    return {
      totalBlacklistedTokens: this.blacklistedTokens.size,
      totalUsers: this.userTokens.size,
      userTokenCounts: Array.from(this.userTokens.entries()).map(([userId, tokens]) => ({
        userId,
        tokenCount: tokens.size,
      })),
    };
  }
}
