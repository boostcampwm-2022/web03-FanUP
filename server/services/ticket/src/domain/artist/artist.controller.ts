import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Artist } from '@prisma/client';
import { ArtistService } from './artist.service';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern({ cmd: 'createArtist' })
  async createArtist(
    @Payload() requestCreateArtistDto: Artist,
  ): Promise<Artist> {
    console.log('create artist on ticket service');
    return this.artistService.create(requestCreateArtistDto);
  }

  @MessagePattern({ cmd: 'updateArtist' })
  async updateArtist(@Payload() requestUpdateArtistDto: Artist) {
    return this.artistService.update(requestUpdateArtistDto);
  }
}
