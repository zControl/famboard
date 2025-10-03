import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompleteTaskDto {
  @ApiProperty({ description: 'The id of the user who completed the task' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The note of the task' })
  @IsString()
  note?: string;
}
