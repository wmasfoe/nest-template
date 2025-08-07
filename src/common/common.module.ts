import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [
    LoggerModule,
    AuthModule,
    ResponseModule, // 导入响应模块，自动注册拦截器和过滤器
  ],
})
export class CommonModule {}
