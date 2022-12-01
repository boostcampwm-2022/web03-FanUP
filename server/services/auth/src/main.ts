import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { AUTH_CONFIG } from './common/constants';
import { HttpExceptionFilter } from './common/exception/filter/http-exception.filter';

const HYBRID_AUTH_PORT = 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceTCP = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: AUTH_CONFIG.PORT,
    },
  });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.startAllMicroservices();
  await app.listen(HYBRID_AUTH_PORT);
  console.log(`Auth service is running on port: ${await app.getUrl()}`);
}
bootstrap();
