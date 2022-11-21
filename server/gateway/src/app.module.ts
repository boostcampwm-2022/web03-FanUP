import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [AuthModule, TicketModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
