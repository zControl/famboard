import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CompleteTaskDto {
  @ApiProperty({ description: 'The id of the user who completed the task' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The possible point value for completing the task.',
  })
  @IsNumber()
  pointsPossible: number;

  @ApiProperty({ description: 'The note of the task' })
  @IsString()
  @IsOptional()
  note: string;
}
