// backend/src/modules/tasks/dto/create-task.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

enum TaskCategory {
  Personal = 'PERSONAL',
  Academic = 'ACADEMIC',
  Household = 'HOUSEHOLD',
  Friendly = 'FRIENDLY',
  Helpful = 'HELPFUL',
  Improvement = 'IMPROVEMENT',
  Other = 'OTHER',
}

enum TaskFrequency {
  Always = 'ALWAYS',
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Special = 'SPECIAL',
}

enum TaskDifficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Tricky = 'TRICKY',
  Hard = 'HARD',
}

enum TaskStatus {
  Todo = 'TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
}

enum TaskPriority {
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

  @ApiProperty({
    enum: TaskDifficulty,
    description: 'The difficulty of the task',
  })
  @IsEnum(TaskDifficulty)
  @IsOptional()
  difficulty?: TaskDifficulty;

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
