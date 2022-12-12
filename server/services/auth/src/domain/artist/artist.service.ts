import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Artist } from '@prisma/client';
import { CustomRpcException } from 'src/common/exception/custom-rpc-exception';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import requestCreateArtistDto from './dto/reqeust-create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async create({
    userId,
    name,
    profileUrl,
  }: requestCreateArtistDto): Promise<any> {
    const user = await this.userService.findOne(userId);

    if (user.role !== 'ARTIST') {
      throw new CustomRpcException(
        'User is not an artist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.artistId !== null) {
      throw new CustomRpcException(
        'User already has an artist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { artist: { create: { name, profileUrl } } },
    });
  }

  async findAll(userId: number) {
    const artists = await this.prisma.artist.findMany({
      include: { favorites: { where: { userId } } },
    });

    return artists.reduce((acc, artist) => {
      const { favorites, ...rest } = artist;
      acc.push({ ...rest, isFavorite: favorites.length > 0 });
      return acc;
    }, []);
  }

  async findFavoritesByUserId(userId: number): Promise<Artist[]> {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: { artist: true },
    });

    return favorites.map((favorite) => favorite.artist);
  }

  findOne(id: number): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }
}
