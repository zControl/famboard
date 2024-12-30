import { IsArray, IsNumber, IsString } from 'class-validator';

export class AssignTaskDto {
  @IsString()
  taskId: string;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
