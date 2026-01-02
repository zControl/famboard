import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TasksToUserDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];
}
