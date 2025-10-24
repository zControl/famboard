import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskAssignment } from '../../tasks/entities/task-assignment.entity';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  sequenceNumber: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'integer', default: 0, nullable: true })
  pointValue: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  frequency: string;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany(() => TaskAssignment, (assignment) => assignment.task)
  assignments: TaskAssignment[];

  get taskCode(): string {
    return this.formatTaskCode(this.sequenceNumber);
  }

  private formatTaskCode(num: number): string {
    const prefix = 'TASK';
    const paddedNum = num.toString().padStart(3, '0');
    return `${prefix}-${paddedNum}`;
  }
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;

  @CreateDateColumn()
  createdAt: Date;
}
