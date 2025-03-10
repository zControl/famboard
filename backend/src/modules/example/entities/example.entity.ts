import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  description: string;

  @Column('int', { default: 0 })
  count: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column('json', { nullable: true, default: { key: 'value' } })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
