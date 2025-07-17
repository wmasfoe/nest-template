import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [LoggerModule],
})
export class CommonModule {}
