import { Module } from '@nestjs/common';

import { UserModule } from '@app/user/user.module';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';

import { UserTaskRepositoryMemory } from '@app/user-task/infra/repository/memory/user-task.repository';

import { FindUserTasksUseCase } from '@app/user-task/application/find-user-tasks/find-user-tasks.use-case';

import { UserTaskController } from '@app/user-task/interface/http/user-task.controller';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: UserTaskRepository,
      useClass: UserTaskRepositoryMemory,
    },
    FindUserTasksUseCase,
  ],
  controllers: [UserTaskController],
  exports: [FindUserTasksUseCase],
})
export class UserTaskModule {}
