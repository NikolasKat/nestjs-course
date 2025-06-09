/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Должно быть строкой!' }) // decorator for validation
  @IsNotEmpty({ message: 'Не должно быть пустым' }) // decorator for validation
  @Length(4, 14, { message: 'Должно быть от 4 до 14 символов' }) // decorator for validation
  tittle: string;

  @IsString({ message: 'Должно быть строкой!' }) // decorator for validation
  @IsOptional()
  description: string;
  @IsBoolean() // decorator for validation
  isCompleted: boolean;
}
