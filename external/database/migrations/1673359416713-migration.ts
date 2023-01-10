import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1673359416713 implements MigrationInterface {
  name = 'migration1673359416713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ADD COLUMN boardStageId integer`,
    );
    await queryRunner.query(
      `CREATE INDEX "INDEX_BOARD_STAGE_ID" ON "task" ("boardStageId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "INDEX_BOARD_STAGE_ID"`);
    await queryRunner.query(`ALTER TABLE DROP COLUMN boardStageId`);
  }
}
