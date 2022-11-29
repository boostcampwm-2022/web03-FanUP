import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { CoreModule } from './core/core.module';
import { SocketModule } from './socket/socket.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [AuthModule, TicketModule, CoreModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
