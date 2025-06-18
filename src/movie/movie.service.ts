/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MovieService {
   constructor(private readonly prismaService: PrismaService) {}

   async findAll() {
      return await this.prismaService.movie.findMany({
         where: { isAvailable: true },
         orderBy: { createdAt: "desc" },
         select: {
            tittle: true,
            rating: true,
            actors: { select: { id: true, name: true } },
         },
      });
   }

   async findById(id: string): Promise<Movie> {
      const movie = await this.prismaService.movie.findUnique({
         where: { id },
         include: { actors: true, poster: true },
      });

      if (!movie || !movie.isAvailable)
         throw new NotFoundException("Фильм не найден");

      return movie;
   }

   async create(dto: CreateMovieDto): Promise<Movie> {
      const { tittle, releaseYear, imageUrl, actorIds } = dto;

      const actors = await this.prismaService.actor.findMany({
         where: {
            id: { in: actorIds },
         },
      });

      if (!actors || !actors.length)
         throw new NotFoundException("Один или несколько актёров не найдены");

      const movie = await this.prismaService.movie.create({
         data: {
            tittle,
            releaseYear,
            poster: {
               create: {
                  url: imageUrl,
               },
            },
            actors: {
               connect: actors.map((actor) => ({
                  id: actor.id,
               })),
            },
         },
      });

      return movie;
   }
   async update(id: string, dto: CreateMovieDto): Promise<boolean> {
      const movie = await this.findById(id);

      const actors = await this.prismaService.actor.findMany({
         where: {
            id: { in: dto.actorIds },
         },
      });

      if (!actors || !actors.length)
         throw new NotFoundException("Один или несколько актёров не найдены");

      await this.prismaService.movie.update({
         where: { id: movie.id },
         data: {
            tittle: dto.tittle,
            releaseYear: dto.releaseYear,
            poster: {
               create: {
                  url: dto.imageUrl,
               },
            },
            actors: {
               connect: actors.map((actor) => ({
                  id: actor.id,
               })),
            },
         },
      });

      return true;
   }

   async delete(id: string): Promise<string> {
      const movie = await this.findById(id);

      await this.prismaService.movie.delete({ where: { id } });

      return movie.id;
   }
}
