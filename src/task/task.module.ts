import { Module } from '@nestjs/common';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { TaskRepositoryMemory } from '@app/task/infra/repository/memory/task.repository';

@Module({
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryMemory,
    },
  ],
})
export class TaskModule {}
