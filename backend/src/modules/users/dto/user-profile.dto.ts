import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  status: string;

  @IsString()
  @ApiProperty()
  theme: string;

  @IsString()
  @ApiProperty()
  avatarUrl: string;
}

export class PartialUserProfileDto extends PartialType(UserProfileDto) {}
