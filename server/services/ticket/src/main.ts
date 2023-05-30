import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { TICKET_CONFIG } from './common/constants/config';
import CustomRpcExceptionFilter from './common/exception/filter/custom-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: TICKET_CONFIG.HOST,
        port: TICKET_CONFIG.PORT,
      },
    },
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
  console.log(`Ticket service is running`);
}
bootstrap();
