import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskApproval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task)
  task: Task;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'timestamp' })
  completedAt: Date;

  @Column({
    type: 'enum',
    enum: ['PENDING_APPROVAL', 'APPROVED', 'REJECTED'],
    default: 'PENDING_APPROVAL',
  })
  status: string;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => User, { nullable: true })
  approvedBy: User;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ type: 'boolean', default: false })
  bonusAwarded: boolean;

  @Column({ type: 'integer', default: 0 })
  bonusValue: number;

  @Column({ type: 'integer', default: null, nullable: true })
  pointsPossible: number;

  @Column({ type: 'integer', default: null, nullable: true })
  pointsAwarded: number;
}
