import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserAssignedTasksDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  @IsOptional()
  taskId?: string;

  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsOptional()
  title?: string;
}
