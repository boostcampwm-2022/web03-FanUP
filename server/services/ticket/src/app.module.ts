import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './domain/ticket/ticket.module';
import { UserTicketModule } from './domain/user-ticket/user-ticket.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TicketModule,
    UserTicketModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/.env`],
      isGlobal: true,
    }),
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
