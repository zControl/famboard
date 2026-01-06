import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TaskToMultipleUsersDto {
  @ApiProperty({ description: 'Array of user IDs to assign to the task' })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
