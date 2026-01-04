import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskActionBodyDto {
  @ApiProperty({ description: 'The ID of the parent approving/rejecting' })
  @IsString()
  parentId: string;

  @ApiProperty({ description: 'Optional bonus points to award' })
  @IsNumber()
  @IsOptional()
  bonusPoints?: number;

  @ApiProperty({ description: 'Optional note for the action' })
  @IsString()
  @IsOptional()
  note?: string;
}
