import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('test')
export class MovieController {
  @Get()
  findAll(@Query() query: any) {
    return `Films with queries: ${JSON.stringify(query)}`;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body('tittle') tittle: string) {
    return `Tittle: "${tittle}" was added`;
  }

  @Get('headers')
  getHeaders(@Headers('user-agent') headers: string) {
    return headers;
  }

  @Get('req')
  getRequest(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      query: req.query,
    };
  }
}
