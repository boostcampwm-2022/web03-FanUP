import { Controller, Get, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Artist } from '@prisma/client';

import { ArtistService } from './artist.service';
import requestCreateArtistDto from './dto/reqeust-create-artist.dto';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern({ cmd: 'createArtist' })
  async createArtist(
    @Payload() requestCreateArtistDto: requestCreateArtistDto,
  ): Promise<Artist> {
    console.log('create artist');
    return this.artistService.create(requestCreateArtistDto);
  }

  @MessagePattern({ cmd: 'getAllArtist' })
  async getAllArtist(): Promise<Artist[]> {
    return this.artistService.findAll();
  }
}
