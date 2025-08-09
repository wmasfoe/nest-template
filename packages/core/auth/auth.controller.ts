import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  Param,
  Headers,
  BadRequestException,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiHeader,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { AuthLoginDto } from './dtos/auth.dto';
import {
  LoginResponseDto,
  LogoutResponseDto,
  ForceLogoutResponseDto,
  BlacklistStatisticsResponseDto,
  UserProfileResponseDto,
} from './dtos/auth.response.dto';
import {
  LoginResponse,
  LogoutResponse,
  ForceLogoutResponse,
  BlacklistStatistics,
  AuthenticatedRequest,
} from './types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password, returns JWT access token',
  })
  @ApiBody({
    type: AuthLoginDto,
    description: 'User login credentials',
    examples: {
      example1: {
        summary: 'Valid login',
        value: {
          account: 'john@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, JWT token returned',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' },
        statusCode: { type: 'number', example: 401 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: AuthLoginDto): Promise<LoginResponse> {
    const curLoginInfo = {
      email: loginDto.account,
      password: loginDto.password,
    };
    return this.authService.login(curLoginInfo);
  }

  // // 保留原有的signIn方法作为兼容
  // @HttpCode(HttpStatus.OK)
  // @Post('signin')
  // signIn(@Body() payload: AuthLoginDto) {
  //   return this.authService.signIn(payload.account, payload.password);
  // }

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Get current authenticated user profile information',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserProfileResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT token missing or invalid',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statusCode: { type: 'number', example: 401 },
      },
    },
  })
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @ApiOperation({
    summary: 'User logout',
    description: 'Logout current user by adding JWT token to blacklist',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Bearer token',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully',
    type: LogoutResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT token missing or invalid',
  })
  @ApiBadRequestResponse({
    description: 'Token not provided in Authorization header',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Token not provided' },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Logout failed',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Headers('authorization') authHeader: string): Promise<LogoutResponse> {
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      throw new BadRequestException('Token not provided');
    }
    return this.authService.logout(token);
  }

  @ApiOperation({
    summary: 'Force user logout (Admin)',
    description: 'Force logout a specific user by blacklisting all their active JWT tokens',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user to force logout',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User force logged out successfully',
    type: ForceLogoutResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT token missing or invalid, or insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Force logout failed',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('force-logout/:userId')
  async forceLogoutUser(@Param('userId') userId: number): Promise<ForceLogoutResponse> {
    return this.authService.forceLogoutUser(+userId);
  }

  @ApiOperation({
    summary: 'Get blacklist statistics (Admin)',
    description: 'Get statistics about blacklisted tokens and users',
  })
  @ApiResponse({
    status: 200,
    description: 'Blacklist statistics retrieved successfully',
    type: BlacklistStatisticsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT token missing or invalid, or insufficient permissions',
  })
  @ApiBearerAuth()
  @Get('blacklist-stats')
  getBlacklistStatistics(): BlacklistStatistics {
    return this.authService.getBlacklistStatistics();
  }
}
