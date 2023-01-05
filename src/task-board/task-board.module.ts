import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskBoardRepository } from '@app/task-board/domain/abstract/task-board.repository';

import { TaskBoardStageEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board-stage.entity';
import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';
import { TaskBoardRepositorySqlite } from '@app/task-board/infra/repository/sqlite/task-board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskBoardStageEntitySqlite,
      TaskBoardEntitySqlite,
    ]),
  ],
  providers: [
    {
      provide: TaskBoardRepository,
      useClass: TaskBoardRepositorySqlite,
    },
  ],
})
export class TaskBoardModule {}
