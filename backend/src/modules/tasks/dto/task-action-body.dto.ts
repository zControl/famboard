import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TaskActionBodyDto {
  @ApiProperty({ description: 'ID of the parent approving the task' })
  @IsString()
  parentId?: string;

  @ApiProperty({
    description: 'Optional bonus points to award',
    required: false,
  })
  @IsOptional()
  bonusPoints?: number;

  @ApiProperty({ description: 'Optional note from parent', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}
