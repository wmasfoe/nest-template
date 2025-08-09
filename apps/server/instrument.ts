import * as Sentry from '@sentry/nestjs';

Sentry.init({
  enabled: process.env.APP_STAGE !== 'local',
  environment: process.env.APP_STAGE,
  dsn: 'https://08e912a78e39c5820e0ed2871224d073@o4505284194074624.ingest.us.sentry.io/4509684655128576',

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // log 为实验性功能
  _experiments: { enableLogs: true },
  // 开启性能监控，并设置采样率，1.0 表示 100% 的事务都会被发送
  tracesSampleRate: 1.0,
});
