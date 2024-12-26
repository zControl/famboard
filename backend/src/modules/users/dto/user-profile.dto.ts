import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserGroup } from 'src/modules/users/entities/user-profile.entity';

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
  firstName: string;

  @IsDateString()
  @ApiProperty()
  birthDate: Date;

  @IsString()
  @ApiProperty()
  bio: string;

  @IsString()
  @ApiProperty()
  theme: string;

  @IsString()
  @ApiProperty()
  avatarUrl: string;

  @IsString()
  @ApiProperty()
  group: UserGroup;
}
