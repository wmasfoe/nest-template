import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [LoggerModule, AuthModule],
})
export class CommonModule {}
