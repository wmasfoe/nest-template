import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { UtilsService } from '@packages/shared/utils/services/utils.service';

import { config } from '@packages/core/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
    private utilsService: UtilsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTestEnv(): string {
    return `${this.appConfig.params.testEnv}`;
  }

  getMyCustomUtil() {
    return this.utilsService.myCustomUtil();
  }
}
