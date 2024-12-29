import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  frequency: string;

  @Column({ nullable: true })
  difficulty: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true })
  note: string;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ManyToMany(() => User)
  @JoinTable()
  assignedTo: User[];
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
