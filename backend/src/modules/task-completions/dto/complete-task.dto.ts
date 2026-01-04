import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CompleteTaskDto {
  @ApiProperty({ description: 'The ID of the user completing the task' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Points possible for this task completion' })
  @IsNumber()
  @IsOptional()
  pointsPossible?: number;

  @ApiProperty({ description: 'Optional note for the completion' })
  @IsString()
  @IsOptional()
  note?: string;
}
