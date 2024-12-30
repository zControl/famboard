import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AssignTaskDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  taskId: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'uuid' } })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
