import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class TaskAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, (task) => task.assignments)
  task: Task;

  @ManyToOne(() => User, (user) => user.taskAssignments)
  user: User;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  assignedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;
}
