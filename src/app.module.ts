import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  HealthModule,
  ResponseInterceptor,
  TracingModule,
  TracingInterceptor,
} from '@tresdoce-nestjs-toolkit/paas';
import { HttpClientInterceptor, HttpClientModule } from '@tresdoce-nestjs-toolkit/http-client';

import { UtilsModule } from '@app/utils/utils.module';
import { UsersModule } from '@app/modules';
import { CommonModule } from '@app/common/common.module';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { getEnvFilePath, config, validationSchema } from '@app/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      ignoreEnvFile: process.env.NODE_ENV === 'production' || false,
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    HealthModule,
    TracingModule,
    HttpClientModule,
    UtilsModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TracingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpClientInterceptor,
    },
  ],
})
export class AppModule {}
