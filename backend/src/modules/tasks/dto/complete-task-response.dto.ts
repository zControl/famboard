// backend/src/modules/tasks/dto/task-completion-response.dto.ts
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class TaskCompletionResponseDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.task.id)
  taskId: string;

  @Expose()
  @Transform(({ obj }) => obj.task.title)
  taskTitle: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: string;

  @Expose()
  completedAt: Date;

  @Expose()
  status: string;

  @Expose()
  note?: string;

  constructor(partial: Partial<TaskCompletionResponseDto>) {
    Object.assign(this, partial);
  }
}
