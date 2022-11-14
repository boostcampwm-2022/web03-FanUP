import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [AuthModule, ApiModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
