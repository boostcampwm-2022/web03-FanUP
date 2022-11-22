import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FanUPModule } from './fanup/fanup.module';

@Module({
  imports: [FanUPModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
