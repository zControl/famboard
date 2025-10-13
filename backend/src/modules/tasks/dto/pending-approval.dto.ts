import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class PendingApprovalDto {
  @Expose()
  @Transform(({ obj }) => obj.id)
  approvalId: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.id)
  userId: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.id)
  taskId: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.title)
  taskTitle: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.description)
  taskDescription: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.category)
  taskCategory: string;

  @Expose()
  @Transform(({ obj }) => obj.task?.pointValue)
  pointsPossible: number;

  @Expose()
  note: string;

  @Expose()
  completedAt: Date;

  constructor(partial: Partial<PendingApprovalDto>) {
    Object.assign(this, partial);
  }
}
