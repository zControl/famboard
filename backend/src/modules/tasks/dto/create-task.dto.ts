import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Point value for completing the task' })
  @IsNumber()
  @IsOptional()
  pointValue?: number;

  @ApiProperty({ description: 'Category of the task' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Frequency of the task (ONCE, DAILY, WEEKLY, MONTHLY, REPEAT)',
  })
  @IsString()
  @IsOptional()
  frequency?: string;

  @ApiProperty({ description: 'Additional notes for the task' })
  @IsString()
  @IsOptional()
  note?: string;
}
