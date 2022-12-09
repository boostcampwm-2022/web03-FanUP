import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './domain/artist/artist.module';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [AuthModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
