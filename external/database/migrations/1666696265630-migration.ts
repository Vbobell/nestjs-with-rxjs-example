import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1666696265630 implements MigrationInterface {
  name = 'migration1666696265630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "deletedById" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "deletedById" integer, CONSTRAINT "FK_TASK_USER_ID" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_TASK_DELETED_BY_USER_ID" FOREIGN KEY ("deletedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_task"("id", "title", "description", "created_at", "deleted_at", "updated_at", "userId", "deletedById") SELECT "id", "title", "description", "created_at", "deleted_at", "updated_at", "userId", "deletedById" FROM "task"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`ALTER TABLE "temporary_task" RENAME TO "task"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" RENAME TO "temporary_task"`);
    await queryRunner.query(
      `CREATE TABLE "task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" varchar(512) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "deletedById" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "task"("id", "title", "description", "created_at", "deleted_at", "updated_at", "userId", "deletedById") SELECT "id", "title", "description", "created_at", "deleted_at", "updated_at", "userId", "deletedById" FROM "temporary_task"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_task"`);
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
