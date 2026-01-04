import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class TaskAssignmentDetailDto {
  @Expose()
  id: string;

  @Expose()
  status: string;

  @Expose()
  assignedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.task?.id)
  taskId: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.title)
  title: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.description)
  description: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.category)
  category: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.frequency)
  frequency: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.pointValue)
  pointValue: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.note)
  note: string;

  constructor(partial: Partial<TaskAssignmentDetailDto>) {
    Object.assign(this, partial);
  }
}
