import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';

export class seed1666352138742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(UserEntitySqlite)
      .values([
        { name: 'Jhon' },
        { name: 'Mary' },
        { name: 'Jose' },
        { name: 'Maria' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(UserEntitySqlite)
      .where([
        { name: 'Jhon' },
        { name: 'Mary' },
        { name: 'Jose' },
        { name: 'Maria' },
      ])
      .execute();
  }
}
