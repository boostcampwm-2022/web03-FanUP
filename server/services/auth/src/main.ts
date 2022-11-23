import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

const HYBRID_AUTH_PORT = 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(HYBRID_AUTH_PORT);
  console.log(`Auth service is running on port: ${await app.getUrl()}`);
}
bootstrap();
