import * as Sentry from "@sentry/nestjs"

Sentry.init({
  dsn: "https://08e912a78e39c5820e0ed2871224d073@o4505284194074624.ingest.us.sentry.io/4509684655128576",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // log 为实验性功能
  _experiments: { enableLogs: true },
});
