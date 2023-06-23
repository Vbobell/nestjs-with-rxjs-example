import { MigrationInterface, QueryRunner } from 'typeorm';

import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';

export class seed1672938322243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TaskBoardEntitySqlite)
      .values([
        {
          name: 'Board 1',
          description: 'Description task 1',
        },
        {
          name: 'Board 2',
          description: 'Description board 2',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(TaskBoardEntitySqlite)
      .where([{ name: 'Board 1' }, { name: 'Board 2' }])
      .execute();
  }
}
