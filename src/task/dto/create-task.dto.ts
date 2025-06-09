/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  // MaxLength,
  // MinLength,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString() // decorator for validation
  @IsNotEmpty() // decorator for validation
  // @MinLength(4)
  // @MaxLength(14)
  @Length(4, 14)
  tittle: string;

  @IsString() // decorator for validation
  @IsOptional()
  description: string;

  @IsArray()
  @IsEnum(TaskTag, {
    message: 'Каждый тег должен быть одим из енамов',
    each: true,
  })
  @IsOptional()
  tags: TaskTag[];
}
