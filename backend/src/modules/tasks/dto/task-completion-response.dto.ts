import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ApprovalResponseDto {
  @Expose()
  @Transform(({ obj }) => obj.task.title)
  taskTitle: string;

  @Expose()
  completedAt: Date;

  @Expose()
  note?: string;

  constructor(partial: Partial<ApprovalResponseDto>) {
    Object.assign(this, partial);
  }
}
