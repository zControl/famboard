import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class TaskCompletionResponseDto {
  @Expose()
  @Transform(({ obj }) => obj.task.title)
  taskTitle: string;

  @Expose()
  completedAt: Date;

  @Expose()
  note?: string;

  constructor(partial: Partial<TaskCompletionResponseDto>) {
    Object.assign(this, partial);
  }
}
