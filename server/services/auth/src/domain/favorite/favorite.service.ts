import { HttpStatus, Injectable } from '@nestjs/common';
import { Artist, Favorite } from '@prisma/client';
import { CustomRpcException } from 'src/common/exception/custom-rpc-exception';
import { PrismaService } from 'src/prisma/prisma.service';
import FavoriteDto from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(favoriteDto: FavoriteDto): Promise<string> {
    const artist = await this.prisma.artist.findUnique({
      where: { id: favoriteDto.artistId },
    });
    if (!artist) {
      throw new CustomRpcException('Invalid Artist Id', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.favorite.upsert({
      where: {
        userId_artistId: favoriteDto,
      },
      create: {
        artist: {
          connect: {
            id: favoriteDto.artistId,
          },
        },
        user: {
          connect: {
            id: favoriteDto.userId,
          },
        },
      },
      update: {},
    });

    return `create favorite: ${favoriteDto.artistId}`;
  }

  async delete(favoriteDto: FavoriteDto): Promise<string> {
    try {
      await this.prisma.favorite.delete({
        where: {
          userId_artistId: favoriteDto,
        },
      });
    } catch (e) {
      throw new CustomRpcException('Invalid Request', HttpStatus.BAD_REQUEST);
    }
    return `delete favorite: ${favoriteDto.artistId}`;
  }

  async findUserIdByArtistId(artistId: number) {
    return await this.prisma.favorite.findMany({
      where: {
        artistId,
      },
      select: {
        userId: true,
      },
    });
  }
}
