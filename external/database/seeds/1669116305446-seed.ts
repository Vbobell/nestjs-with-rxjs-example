import { MigrationInterface, QueryRunner } from 'typeorm';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';

export class seed1669116305446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TaskEntitySqlite)
      .values([
        {
          title: 'Task 1',
          description: 'Description to task 1',
          user: { id: 1 },
        },
        {
          title: 'Task 2',
          description: 'Description to task 2',
          user: { id: 1 },
        },
        {
          title: 'Task 3',
          description: 'Description to task 3',
          user: { id: 2 },
        },
        {
          title: 'Task 4',
          description: 'Description to task 4',
          user: { id: 2 },
        },
        {
          title: 'Task 5',
          description: 'Description to task 5',
          user: { id: 3 },
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(TaskEntitySqlite)
      .where([{ user: { id: 1 } }, { user: { id: 2 } }, { user: { id: 3 } }])
      .execute();
  }
}
