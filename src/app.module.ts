import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@tresdoce-nestjs-toolkit/paas';
import { SentryModule } from '@sentry/nestjs/setup';

import { UtilsModule } from '@app/utils/utils.module';
import { UsersModule } from '@app/modules';
import { CommonModule } from '@app/common/common.module';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { getEnvFilePath, config } from '@app/config';

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
    UtilsModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    // ResponseModule 已通过 CommonModule 自动注册全局拦截器和过滤器
  ],
  exports: [Logger],
})
export class AppModule {}
