import { TaskApproval } from 'src/modules/tasks/entities/task-approval.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from './task.entity';

@Entity()
export class TaskAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, (task) => task.assignments)
  task: Task;

  @ManyToOne(() => User, (user) => user.taskAssignments)
  user: User;

  @Column({ type: 'timestamp', nullable: true })
  assignedAt: Date;

  @Column({
    type: 'enum',
    enum: ['ASSIGNED', 'PENDING_APPROVAL', 'COMPLETED', 'REJECTED'],
    default: 'ASSIGNED',
  })
  status: string;

  @OneToOne(() => TaskApproval, { nullable: true })
  approval: TaskApproval;
}
