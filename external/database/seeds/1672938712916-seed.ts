import { MigrationInterface, QueryRunner } from 'typeorm';

import { TaskBoardStageEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board-stage.entity';

export class seed1672938712916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TaskBoardStageEntitySqlite)
      .values([
        {
          name: 'Stage board 1',
          description: 'Description stage board 1',
          board: {
            id: 1,
          },
        },
        {
          name: 'Stage board 2',
          description: 'Description stage board 2',
          board: {
            id: 1,
          },
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(TaskBoardStageEntitySqlite)
      .where([{ board: { id: 1 } }])
      .execute();
  }
}
