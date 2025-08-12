import { ApiProperty } from '@nestjs/swagger';
import type {
  LoginResponse,
  LogoutResponse,
  JwtUser,
  ForceLogoutResponse,
  BlacklistStatistics,
} from '@packages/shared';

// 登录响应DTO
export class LoginResponseDto implements LoginResponse {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTczNjE5MjM4OCwiZXhwIjoxNzM2Mjc4Nzg4fQ.example',
  })
  access_token: string;
}

// 用户信息响应DTO
export class UserProfileResponseDto implements JwtUser {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@example.com',
  })
  email: string;
}

// 登出响应DTO
export class LogoutResponseDto implements LogoutResponse {
  @ApiProperty({
    description: 'Logout success message',
    example: 'Logged out successfully',
  })
  message: string;
}

// 强制登出响应DTO
export class ForceLogoutResponseDto implements ForceLogoutResponse {
  @ApiProperty({
    description: 'Force logout message',
    example: 'User 1 has been forced to logout',
  })
  message: string;

  @ApiProperty({
    description: 'Number of tokens revoked',
    example: 3,
  })
  revokedTokens: number;
}

// 用户token统计DTO
export class UserTokenCountDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Number of tokens for this user',
    example: 2,
  })
  tokenCount: number;
}

// 黑名单统计响应DTO
export class BlacklistStatisticsResponseDto implements BlacklistStatistics {
  @ApiProperty({
    description: 'Total number of blacklisted tokens',
    example: 15,
  })
  totalBlacklistedTokens: number;

  @ApiProperty({
    description: 'Total number of users with blacklisted tokens',
    example: 5,
  })
  totalUsers: number;

  @ApiProperty({
    description: 'Token count per user',
    type: [UserTokenCountDto],
  })
  userTokenCounts: UserTokenCountDto[];
}
