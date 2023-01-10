import { MigrationInterface, QueryRunner } from 'typeorm';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';

export class seed1673359716665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(TaskEntitySqlite)
      .set({
        boardId: 1,
        boardStageId: 1,
      })
      .where({
        title: 'Task 1',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .update(TaskEntitySqlite)
      .set({
        boardId: 1,
        boardStageId: 1,
      })
      .where({
        title: 'Task 2',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(TaskEntitySqlite)
      .set({
        boardId: null,
        boardStageId: null,
      })
      .where({
        title: 'Task 1',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .update(TaskEntitySqlite)
      .set({
        boardId: null,
        boardStageId: null,
      })
      .where({
        title: 'Task 2',
      })
      .execute();
  }
}
