import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './domain/ticket/ticket.module';
import { UserTicketModule } from './domain/user-ticket/user-ticket.module';

@Module({
  imports: [
    TicketModule,
    UserTicketModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/.env`],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
