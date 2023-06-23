import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1672924205791 implements MigrationInterface {
  name = 'migration1672924205791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task-board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" varchar(512), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task-board-stage" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" varchar(512), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "boardId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_task-board-stage" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" varchar(512), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "boardId" integer, CONSTRAINT "FK_31ae18ce8c781e7c39373415496" FOREIGN KEY ("boardId") REFERENCES "task-board" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_task-board-stage"("id", "name", "description", "created_at", "deleted_at", "updated_at", "boardId") SELECT "id", "name", "description", "created_at", "deleted_at", "updated_at", "boardId" FROM "task-board-stage"`,
    );
    await queryRunner.query(`DROP TABLE "task-board-stage"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_task-board-stage" RENAME TO "task-board-stage"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task-board-stage" RENAME TO "temporary_task-board-stage"`,
    );
    await queryRunner.query(
      `CREATE TABLE "task-board-stage" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "description" varchar(512), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "boardId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "task-board-stage"("id", "name", "description", "created_at", "deleted_at", "updated_at", "boardId") SELECT "id", "name", "description", "created_at", "deleted_at", "updated_at", "boardId" FROM "temporary_task-board-stage"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_task-board-stage"`);
    await queryRunner.query(`DROP TABLE "task-board-stage"`);
    await queryRunner.query(`DROP TABLE "task-board"`);
  }
}
