import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsDateString()
  @ApiProperty()
  birthDate: Date;

  @IsString()
  @ApiProperty()
  bio: string;

  @IsString()
  @ApiProperty()
  statusEmoji: string;

  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  theme: string;

  @IsString()
  @ApiProperty()
  avatarUrl: string;

  @IsNumber()
  @ApiProperty()
  pointTotal: number;

  @IsNumber()
  @ApiProperty()
  piggyBankCents: number;

  @IsString()
  @ApiProperty()
  piggyBankDisplay: string;
}

export class PartialUserProfileDto extends PartialType(UserProfileDto) {}
