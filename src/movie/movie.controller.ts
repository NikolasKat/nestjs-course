import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Post,
   Put,
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Controller("movies")
export class MovieController {
   constructor(private readonly movieService: MovieService) {}

   @Get()
   findAll() {
      return this.movieService.findAll();
   }

   @Get(":id")
   findById(@Param("id") id: string) {
      return this.movieService.findById(id);
   }

   @Post()
   create(@Body() dto: CreateMovieDto) {
      return this.movieService.create(dto);
   }

   @Put(":id")
   update(@Param("id") id: string, @Body() dto: CreateMovieDto) {
      return this.movieService.update(id, dto);
   }

   @Delete(":id")
   delete(@Param("id") id: string) {
      return this.movieService.delete(id);
   }
}
