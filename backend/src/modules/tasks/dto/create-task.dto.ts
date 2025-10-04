import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TaskCategory {
  Personal = 'PERSONAL',
  Academic = 'ACADEMIC',
  Household = 'HOUSEHOLD',
  Friendly = 'FRIENDLY',
  Helpful = 'HELPFUL',
  Improvement = 'IMPROVEMENT',
  Fitness = 'FITNESS',
  Other = 'OTHER',
}

export enum TaskFrequency {
  Once = 'ONCE',
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Special = 'SPECIAL',
}

export enum TaskStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum TaskPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsNumber()
  @IsOptional()
  pointValue?: number;

  @ApiProperty({ enum: TaskCategory, description: 'The category of the task' })
  @IsEnum(TaskCategory)
  @IsOptional()
  category?: TaskCategory;

  @ApiProperty({
    enum: TaskFrequency,
    description: 'The frequency of the task',
  })
  @IsEnum(TaskFrequency)
  @IsOptional()
  frequency?: TaskFrequency;

  @ApiProperty({ enum: TaskStatus, description: 'The status of the task' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ enum: TaskPriority, description: 'The priority of the task' })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({ description: 'Additional notes for the task' })
  @IsString()
  @IsOptional()
  note?: string;
}
