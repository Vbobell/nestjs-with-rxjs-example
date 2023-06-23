import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1672939643582 implements MigrationInterface {
  name = 'migration1672939643582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD COLUMN boardId integer`);
    await queryRunner.query(
      `CREATE INDEX "INDEX_BOARD_ID" ON "task" ("boardId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "INDEX_BOARD_ID"`);
    await queryRunner.query(`ALTER TABLE DROP COLUMN boardId`);
  }
}
