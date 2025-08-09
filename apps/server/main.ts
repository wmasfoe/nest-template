import './instrument';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const appConfig = app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const { server, swagger, project, version } = appConfig;
  const port: number = parseInt(server.port, 10) || 8080;

  app.setGlobalPrefix(`${server.context}`);

  const versions = version ? version.split(',').map((v) => v?.trim()) : VERSION_NEUTRAL;
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: typeof version === 'undefined' ? VERSION_NEUTRAL : versions,
    prefix: 'v',
  });

  app.use([cookieParser(), compression(), helmet()]);
  // app.useGlobalFilters(new ExceptionsFilter(appConfig));

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('class-transformer'),
      whitelist: true, // 过滤掉 dto 中没有定义的属性
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(`${project.name}`)
      .setVersion(`${project.version}`)
      .setDescription(`Swagger - ${project.description}`)
      .setExternalDoc('Documentation', project.homepage)
      .setContact(project.author.name, project.author.url, project.author.email)
      .addServer(`/${server.context}`)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'bearer',
      )
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
      autoTagControllers: true,
    });
    SwaggerModule.setup(`${server.context}/${swagger.path}`, app, document, {});
  }

  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
    });
  }

  await app.listen(port, async (): Promise<void> => {
    const appServer: string = `http://localhost:${port}/${server.context}`;
    if (swagger.enabled) {
      Logger.log(`📚 Swagger is running on: ${appServer}/${swagger.path}`, `${project.name}`);
    }
    Logger.log(`🚀 Application is running on: ${appServer}`, `${project.name}`);
  });
}

(async (): Promise<void> => await bootstrap())();
