import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';

@Entity('task-board-stage')
export class TaskBoardStageEntitySqlite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    comment: 'Name of task board stage',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    comment: 'Description of task board stage',
    length: 512,
    nullable: true,
  })
  description?: string;

  @ManyToOne(() => TaskBoardEntitySqlite, (taskBoard) => taskBoard.stages)
  board: TaskBoardEntitySqlite;

  @CreateDateColumn({
    comment: 'Record when task board has been created',
    name: 'created_at',
    type: 'datetime',
  })
  createdAt?: Date;

  @DeleteDateColumn({
    comment: 'Record when task board has been deleted',
    name: 'deleted_at',
    type: 'datetime',
  })
  deletedAt?: Date;

  @UpdateDateColumn({
    comment: 'Record when task board has been updated',
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt?: Date;
}
