import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  theme: string;

  @Column()
  avatarUrl: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
