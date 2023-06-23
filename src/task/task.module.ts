import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';
import { TaskRepositorySqlite } from '@app/task/infra/repository/sqlite/task.repository';

import { FindTaskUseCase } from '@app/task/application/find-task/find-task.use-case';
import { FindTasksByBoardIdAndBoardStageIdUseCase } from '@app/task/application/find-tasks-by-board-id-and-board-stage-id/find-tasks-by-board-id-and-board-stage-id.use-case';
import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

import { TaskController } from '@app/task/interface/http/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntitySqlite])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositorySqlite,
    },
    ListTaskUseCase,
    FindTaskUseCase,
    FindTasksByBoardIdAndBoardStageIdUseCase,
  ],
  controllers: [TaskController],
  exports: [
    ListTaskUseCase,
    FindTaskUseCase,
    FindTasksByBoardIdAndBoardStageIdUseCase,
  ],
})
export class TaskModule {}
