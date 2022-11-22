import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';
import { TaskRepositorySqlite } from '@app/task/infra/repository/sqlite/task.repository';

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
  ],
  controllers: [TaskController],
  exports: [ListTaskUseCase],
})
export class TaskModule {}
