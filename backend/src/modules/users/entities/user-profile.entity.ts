import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  firstName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true, default: '😀' })
  statusEmoji: string;

  @Column({ nullable: true, default: 'Available' })
  status: string;

  @Column()
  theme: string;

  @Column()
  avatarUrl: string;

  @Column({ type: 'integer', default: 0 })
  pointTotal: number;

  @Column({ type: 'integer', default: 0 })
  piggyBankCents: number;
}
