import { ApiProperty } from '@nestjs/swagger';

// 登录响应DTO
export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTczNjE5MjM4OCwiZXhwIjoxNzM2Mjc4Nzg4fQ.example',
  })
  access_token: string;
}

// 用户信息响应DTO
export class UserProfileResponseDto {
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
export class LogoutResponseDto {
  @ApiProperty({
    description: 'Logout success message',
    example: 'Logged out successfully',
  })
  message: string;
}

// 强制登出响应DTO
export class ForceLogoutResponseDto {
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
export class BlacklistStatisticsResponseDto {
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
