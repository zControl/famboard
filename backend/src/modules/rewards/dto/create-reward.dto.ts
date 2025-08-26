import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRewardDto {
  @ApiProperty({ description: 'The title of the reward' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the reward' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The point value of the reward' })
  @IsNumber()
  rewardValue: number;

  @ApiProperty({ description: 'The note of the reward' })
  @IsString()
  @IsOptional()
  note?: string;
}
