import { Exclude, Expose, Transform } from 'class-transformer';
import { TaskApproval } from 'src/modules/task-approvals/entities/task-approval.entity';


function transformFromTaskApproval<T>(
  propertyFn: (entity: TaskApproval) => T
) {
  return ({ obj }: { obj: any }) => propertyFn(obj as TaskApproval);
}

@Exclude()
export class ApprovalDto {
  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.id))
  approvalId: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.status))
  approvalStatus: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.approvedBy?.id))
  approvedById: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.approvedBy?.profile?.avatarUrl))
  approvedByAvatarUrl: string;

  @Expose()
  approvedAt: Date;

  @Expose()
  completedAt: Date;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.user.id))
  userId: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.user.profile?.avatarUrl))
  userAvatarUrl: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.task.id))
  taskId: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.task.title))
  taskTitle: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.task.description))
  taskDescription: string;

  @Expose()
  @Transform(transformFromTaskApproval(approval => approval.task.category))
  taskCategory: string;

  @Expose()
  pointsPossible: number;

  @Expose()
  pointsAwarded: number;

  @Expose()
  note: string;

  constructor(partial: Partial<ApprovalDto>) {
    Object.assign(this, partial);
  }
}
