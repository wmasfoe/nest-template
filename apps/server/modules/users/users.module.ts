import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 导出UsersService供其他模块使用
})
export class UsersModule {}
