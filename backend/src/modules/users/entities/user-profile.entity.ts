import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum UserGroup {
  ADMIN = 'admin',
  PARENT = 'parent',
  KID = 'kid',
  GUEST = 'guest',
}

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
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

  @Column()
  theme: string;

  @Column()
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: UserGroup,
    default: UserGroup.GUEST,
  })
  group: UserGroup;
}
