import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntitySqlite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    comment: 'Name of user',
    length: 255,
    nullable: false,
  })
  name: string;

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
