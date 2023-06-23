import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from '@app/task/task.module';

import { TaskBoardRepository } from '@app/task-board/domain/abstract/task-board.repository';

import { TaskBoardStageEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board-stage.entity';
import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';
import { TaskBoardRepositorySqlite } from '@app/task-board/infra/repository/sqlite/task-board.repository';

import { TaskBoardService } from '@app/task-board/application/services/task-board/task-board.service';
import { FindTaskBoardByIdUseCase } from '@app/task-board/application/use-case/find-task-board-by-id/find-task-board-by-id.use-case';

import { TaskBoardController } from '@app/task-board/interface/http/task-board.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskBoardStageEntitySqlite,
      TaskBoardEntitySqlite,
    ]),
    TaskModule,
  ],
  providers: [
    {
      provide: TaskBoardRepository,
      useClass: TaskBoardRepositorySqlite,
    },
    FindTaskBoardByIdUseCase,
    TaskBoardService,
  ],
  exports: [FindTaskBoardByIdUseCase, TaskBoardService],
  controllers: [TaskBoardController],
})
export class TaskBoardModule {}
