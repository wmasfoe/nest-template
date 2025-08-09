import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@tresdoce-nestjs-toolkit/paas';
import { SentryModule } from '@sentry/nestjs/setup';

import { CoreModule } from '@packages/core/core.module';
import { UtilsModule } from '@packages/shared/utils/utils.module';
import { getEnvFilePath, config } from '@packages/core/config';
import { UsersModule, UsersService } from './modules';
import { PrismaService } from './services/prisma.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      ignoreEnvFile: process.env.NODE_ENV === 'production' || false,
      load: [config],
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    HealthModule,
    CoreModule.forRoot({ userRepository: UsersService }), // ✨ 使用动态配置解决循环依赖
    UtilsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    PrismaService, // 移动到业务层的数据库服务
    // ResponseModule 已通过 CoreModule 自动注册全局拦截器和过滤器
  ],
  exports: [Logger, PrismaService],
})
export class AppModule {}
