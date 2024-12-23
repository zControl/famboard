import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserGroup,
    default: UserGroup.GUEST,
  })
  group: UserGroup;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
