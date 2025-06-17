import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  author_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear())
  published_year: number;
}
