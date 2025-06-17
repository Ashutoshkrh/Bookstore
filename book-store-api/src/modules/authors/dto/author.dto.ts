import { IsBase64, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNewAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  source: string;

  @IsString()
  userName: string;

  @IsString()
  userId: string;
}

export class AuthorIdDto {
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  authorId: string;
}

export class UpdateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  source: string;

  @IsString()
  userName: string;

  @IsString()
  userId: string;
}
