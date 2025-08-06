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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import {
  LoginResponse,
  LogoutResponse,
  ForceLogoutResponse,
  BlacklistStatistics,
  AuthenticatedRequest,
  LoginRequest,
} from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: LoginRequest): Promise<LoginResponse> {
    const curLoginInfo = {
      email: req.body.account,
      password: req.body.password,
    };
    // LocalAuthGuard会自动验证用户，并将用户信息放在req.user中
    return this.authService.login(curLoginInfo);
  }

  // // 保留原有的signIn方法作为兼容
  // @HttpCode(HttpStatus.OK)
  // @Post('signin')
  // signIn(@Body() payload: AuthLoginDto) {
  //   return this.authService.signIn(payload.account, payload.password);
  // }

  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Headers('authorization') authHeader: string): Promise<LogoutResponse> {
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      throw new BadRequestException('Token not provided');
    }
    return this.authService.logout(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('force-logout/:userId')
  async forceLogoutUser(@Param('userId') userId: number): Promise<ForceLogoutResponse> {
    return this.authService.forceLogoutUser(+userId);
  }

  @Get('blacklist-stats')
  getBlacklistStatistics(): BlacklistStatistics {
    return this.authService.getBlacklistStatistics();
  }
}
