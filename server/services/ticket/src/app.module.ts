import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './domain/ticket/ticket.module';
import { UserTicketModule } from './domain/user-ticket/user-ticket.module';

@Module({
  imports: [TicketModule, UserTicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
