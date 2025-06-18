/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ReviewDto } from "./dto/create-review.dto";
import { Review } from "generated/prisma";
@Injectable()
export class ReviewService {
   constructor(private readonly prismaService: PrismaService) {}

   async create(dto: ReviewDto): Promise<Review> {
      const { text, movieId, rating } = dto;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const review = await this.prismaService.review.create({
         data: { text, rating, movie: { connect: { id: movieId } } },
      });

      return review;
   }
}
