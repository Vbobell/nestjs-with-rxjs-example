import { Module } from '@nestjs/common';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { TaskRepositoryMemory } from '@app/task/infra/repository/memory/task.repository';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

@Module({
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryMemory,
    },
    ListTaskUseCase,
  ],
})
export class TaskModule {}
