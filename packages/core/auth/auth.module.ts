import { DynamicModule, Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BlacklistService } from './services/blacklist.service';
import { APP_GUARD } from '@nestjs/core';

export interface AuthModuleOptions {
  userRepository: Type<any>; // 用户仓库实现类（类类型）
}

@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('config.jwt.secret'),
            signOptions: { expiresIn: configService.get('config.jwt.expiresIn') },
          }),
        }),
      ],
      controllers: [AuthController],
      providers: [
        options.userRepository, // 先注册用户服务类
        {
          provide: 'IUserAuthRepository',
          useExisting: options.userRepository,
        },
        AuthService,
        ConfigService,
        JwtService,
        LocalStrategy,
        JwtStrategy,
        LocalAuthGuard,
        JwtAuthGuard,
        BlacklistService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
      exports: [AuthService, JwtModule, LocalAuthGuard],
    };
  }
}
