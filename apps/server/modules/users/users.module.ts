import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PasswordUtil } from '@packages/core/auth/utils/password.util';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PasswordUtil],
  exports: [UsersService], // 导出UsersService供其他模块使用
})
export class UsersModule {}
