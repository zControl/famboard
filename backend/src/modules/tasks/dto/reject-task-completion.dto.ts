import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RejectTaskCompletionDto {
  @ApiProperty({ description: 'ID of the parent rejecting the task' })
  @IsString()
  parentId: string;

  @ApiProperty({ description: 'Reason for rejection' })
  @IsString()
  @IsNotEmpty()
  note: string;
}
