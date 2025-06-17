//start copilot ji
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateDoggDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class SolveDoggDTO {
  @IsNumber()
  @IsNotEmpty()
  dognum: number;
  @IsString()
  @IsNotEmpty()
  doggnaam: string;
}

export class DoggresponseDTO {
  @IsString()
  @IsNotEmpty()
  doggnaam: string;
}