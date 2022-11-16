import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SocketIoAdapter } from './adapter/socket-io.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    },
  );

  // Socket.io 설정
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen();
}
bootstrap();
