import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskBoardRepository } from '@app/task-board/domain/abstract/task-board.repository';

import { TaskBoardStageEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board-stage.entity';
import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';
import { TaskBoardRepositorySqlite } from '@app/task-board/infra/repository/sqlite/task-board.repository';

import { FindTaskBoardByIdUseCase } from '@app/task-board/application/use-case/find-task-board-by-id/find-task-board-by-id.use-case';

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
    FindTaskBoardByIdUseCase,
  ],
  exports: [FindTaskBoardByIdUseCase],
})
export class TaskBoardModule {}
