import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

const HYBRID_AUTH_PORT = 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceTCP = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(4001);
  console.log(`Auth service is running on port: ${await app.getUrl()}`);
}
bootstrap();
