import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as Sentry from '@sentry/nestjs';
import Transport from 'winston-transport';
import * as winston from 'winston';
import { utilities } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

const SentryWinstonTransport = Sentry.createSentryWinstonTransport(Transport, {
  levels: ['error', 'warn', 'info', 'trace', 'fatal'],
});

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.get('config');
        const isLoggerEnabled = appConfig?.loggerEnabled;
        // 控制台输出
        if (!isLoggerEnabled) {
          return {
            transports: [
              new winston.transports.Console({
                format: winston.format.combine(
                  winston.format.colorize({ all: true }),
                  utilities.format.nestLike('nest'),
                  winston.format.simple(),
                ),
              }),
            ],
          };
        }
        return {
          transports: [
            new SentryWinstonTransport({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike('nest'),
                winston.format.prettyPrint(),
              ),
            }),
          ],
        };
      },
    }),
  ],
})
export class LoggerModule {}
