import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from '../../provider/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArtistDto: Artist) {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  update(updateArtistDto: Artist) {
    return this.prisma.artist.update({
      where: { id: updateArtistDto.id },
      data: updateArtistDto,
    });
  }
}
