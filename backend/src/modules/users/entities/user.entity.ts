import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskAssignment } from '../../task-assignments/entities/task-assignment.entity';
import { UserProfile } from '../../users/entities/user-profile.entity';

export enum UserGroup {
  ADMIN = 'admin',
  PARENT = 'parent',
  KID = 'kid',
  GUEST = 'guest',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserGroup,
    default: UserGroup.GUEST,
  })
  group: UserGroup;

  @OneToMany(() => TaskAssignment, (assignment) => assignment.user)
  taskAssignments: TaskAssignment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
