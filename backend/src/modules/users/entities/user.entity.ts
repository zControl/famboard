import * as bcrypt from 'bcrypt';
import { TaskAssignment } from 'src/modules/tasks/entities/task-assignment.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { UserProfile } from 'src/modules/users/entities/user-profile.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Task, (task) => task.assignedUsers)
  assignedTasks: Task[];

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
