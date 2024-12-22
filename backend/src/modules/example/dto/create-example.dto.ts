import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  count: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean;

  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  metadata: Record<string, any>;
}
