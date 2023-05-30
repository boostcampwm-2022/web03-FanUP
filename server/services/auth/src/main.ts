import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

import { MICRO_SERVICES } from './common/constants/config';
import CustomRpcExceptionFilter from './common/exception/filter/custom-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: MICRO_SERVICES.AUTH.HOST,
        port: MICRO_SERVICES.AUTH.PORT,
      },
    },
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
  console.log(`Auth service is running`);
}
bootstrap();
