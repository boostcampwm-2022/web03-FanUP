import { Controller, Get, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Artist } from '@prisma/client';

import { ArtistService } from './artist.service';
import requestCreateArtistDto from './dto/reqeust-create-artist.dto';
import RequestUpdateArtistDto from './dto/request-update-artist.dto';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern({ cmd: 'createArtist' })
  async createArtist(
    @Payload() requestCreateArtistDto: requestCreateArtistDto,
  ): Promise<string> {
    console.log('create artist');
    return this.artistService.create(requestCreateArtistDto);
  }

  @MessagePattern({ cmd: 'getAllArtist' })
  async getAllArtist(@Payload() userId: number): Promise<Artist[]> {
    return this.artistService.findAll(userId);
  }

  @MessagePattern({ cmd: 'getFavoriteArtist' })
  async getFavoriteArtist(@Payload() userId: number): Promise<Artist[]> {
    return this.artistService.findFavoritesByUserId(userId);
  }

  @MessagePattern({ cmd: 'updateArtist' })
  async updateArtist(
    @Payload() requestUpdateArtistDto: RequestUpdateArtistDto,
  ) {
    console.log(requestUpdateArtistDto);
    return this.artistService.update(requestUpdateArtistDto);
  }

  @MessagePattern({ cmd: 'getAllSubscriber' })
  async getAllSubscribers(@Payload() artistId: number) {
    return this.artistService.getAllSubscriber(artistId);
  }
}
