import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TaskToSingleUserDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString({ each: true })
  userId: string;
}
