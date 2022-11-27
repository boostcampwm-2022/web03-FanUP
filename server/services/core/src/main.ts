import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceTCP = app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    },
    { inheritAppConfig: true },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.startAllMicroservices();
  await app.listen(4002);
  console.log(`Core service is running on port: ${await app.getUrl()}`);
}
bootstrap();
