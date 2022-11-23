import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FanUPModule } from './fanup/fanup.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { FanupModule } from './fanup/fanup.module';

@Module({
  imports: [FanUPModule, PrismaModule, ChatModule, FanupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
