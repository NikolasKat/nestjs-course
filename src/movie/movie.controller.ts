import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(+id);
  }

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateMovieDto) {
    return this.movieService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(+id);
  }
  // @Get()
  // findAll(@Query() query: any) {
  //   return `Films with queries: ${JSON.stringify(query)}`;
  // }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return { id };
  // }

  // @Post()
  // create(@Body('tittle') tittle: string) {
  //   return `Tittle: "${tittle}" was added`;
  // }

  // @Get('headers')
  // getHeaders(@Headers('user-agent') headers: string) {
  //   return headers;
  // }

  // @Get('req')
  // getRequest(@Req() req: Request) {
  //   return {
  //     method: req.method,
  //     url: req.url,
  //     query: req.query,
  //   };
  // }
}
