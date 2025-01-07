import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TaskAssignedUsersDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'The username that is assigned.' })
  @IsString()
  @IsOptional()
  userName?: string;
}
