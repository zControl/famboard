import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TasksToUserDto {
  @ApiProperty({ description: 'Array of task IDs to assign to the user' })
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];
}
