import type { IUserAuthRepository } from './auth/interfaces/user-repository.interface';
import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';

export interface CoreModuleOptions {
  userRepository: Type<IUserAuthRepository>; // 用户仓库实现类（传入类类型）
}

@Global()
@Module({})
export class CoreModule {
  static forRoot(options: CoreModuleOptions): DynamicModule {
    return {
      module: CoreModule,
      global: true,
      providers: [],
      exports: [],
      imports: [
        LoggerModule,
        AuthModule.forRoot({ userRepository: options.userRepository }),
        ResponseModule, // 导入响应模块，自动注册拦截器和过滤器
      ],
    };
  }
}
