import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class PendingApprovalDto {
  @Expose()
  @Transform(({ obj }) => obj.id)
  approvalId: string;

  @Expose()
  completedAt: Date;

  @Expose()
  note: string;

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
  @Transform(({ obj }) => obj.task?.pointValue)
  pointsPossible: number;

  @Expose()
  @Transform(({ obj }) => obj.user?.id)
  userId: string;

  constructor(partial: Partial<PendingApprovalDto>) {
    Object.assign(this, partial);
  }
}
