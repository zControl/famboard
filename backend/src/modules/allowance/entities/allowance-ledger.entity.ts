import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AllowanceLedger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'integer' })
  pointsBefore: number;

  @Column({ type: 'integer' })
  pointsConverted: number;

  @Column({ type: 'integer' })
  pointsAfter: number;

  @Column({ type: 'integer' })
  ratePointsPerDollar: number;

  @Column({ type: 'integer' })
  amountCents: number;
}
