import { Module } from '@nestjs/common';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { TaskRepositoryMemory } from '@app/task/infra/repository/memory/task.repository';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

import { TaskController } from '@app/task/interface/http/task.controller';

@Module({
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryMemory,
    },
    ListTaskUseCase,
  ],
  controllers: [TaskController],
  exports: [ListTaskUseCase],
})
export class TaskModule {}
