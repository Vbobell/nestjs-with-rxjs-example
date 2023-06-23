import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';

@Entity('task')
export class TaskEntitySqlite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    comment: 'Title of task',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column('varchar', {
    comment: 'Title of task',
    length: 512,
    nullable: false,
  })
  description: string;

  @Index({ unique: false })
  @Column('int', {
    comment: 'Board id of task',
    nullable: true,
  })
  boardId?: number;

  @Index({ unique: false })
  @Column('int', {
    comment: 'Board stage id of task',
    nullable: true,
  })
  boardStageId?: number;

  @ManyToOne(() => UserEntitySqlite, {
    nullable: true,
  })
  user?: UserEntitySqlite;

  @ManyToOne(() => UserEntitySqlite, {
    nullable: true,
  })
  deletedBy?: UserEntitySqlite;

  @CreateDateColumn({
    comment: 'Record when user has been created',
    name: 'created_at',
    type: 'datetime',
  })
  createdAt?: Date;

  @DeleteDateColumn({
    comment: 'Record when user has been deleted',
    name: 'deleted_at',
    type: 'datetime',
  })
  deletedAt?: Date;

  @UpdateDateColumn({
    comment: 'Record when user has been updated',
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt?: Date;
}
