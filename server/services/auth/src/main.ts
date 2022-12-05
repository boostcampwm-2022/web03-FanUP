import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AUTH_CONFIG } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: AUTH_CONFIG.HOST,
      port: AUTH_CONFIG.PORT,
    },
  });
  await app.listen();
  console.log(`Auth service is running`);
}
bootstrap();
