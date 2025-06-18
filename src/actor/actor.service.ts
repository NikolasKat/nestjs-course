import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ActorDto } from "./dto/create-actor.dto";
import { Actor } from "@prisma/client";

@Injectable()
export class ActorService {
   constructor(private readonly prismaService: PrismaService) {}

   async create(dto: ActorDto): Promise<Actor> {
      const { name } = dto;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const actor = await this.prismaService.actor.create({ data: { name } });
      return actor;
   }
}
