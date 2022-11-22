import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@app/user/user.module';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';
import { UserTaskRepositorySqlite } from '@app/user-task/infra/repository/sqlite/user-task.repository';

import { FindUserTasksUseCase } from '@app/user-task/application/find-user-tasks/find-user-tasks.use-case';

import { UserTaskController } from '@app/user-task/interface/http/user-task.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([TaskEntitySqlite])],
  providers: [
    {
      provide: UserTaskRepository,
      useClass: UserTaskRepositorySqlite,
    },
    FindUserTasksUseCase,
  ],
  controllers: [UserTaskController],
  exports: [FindUserTasksUseCase],
})
export class UserTaskModule {}
