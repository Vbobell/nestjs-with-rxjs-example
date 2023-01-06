import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';
import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';

@Injectable()
export class TaskRepositorySqlite implements TaskRepository<TaskEntitySqlite> {
  private readonly logger = new Logger(TaskRepositorySqlite.name);

  constructor(
    @InjectRepository(TaskEntitySqlite)
    private readonly repository: Repository<TaskEntitySqlite>,
  ) {}

  getTasks(): Observable<Task[]> {
    return from(this.repository.find()).pipe(
      map((taskEntities: TaskEntitySqlite[]) =>
        this.mapEntitiesToDomain(taskEntities),
      ),
      loggerOperator(this.logger, {
        initLog: {
          message: 'getTasks | execution started',
        },
        endLog: {
          message: 'getTasks | finished execution',
        },
        errorLog: {
          message: 'getTasks | execution with error',
        },
      }),
    );
  }

  mapEntityToDomain(taskEntityMemory: TaskEntitySqlite): Task {
    const task: Task = {
      title: taskEntityMemory.title,
      description: taskEntityMemory.description,
      ...(taskEntityMemory.boardId && { boardId: taskEntityMemory.boardId }),
      ...(taskEntityMemory.user && { user: taskEntityMemory.user }),
    };

    return task;
  }

  mapEntitiesToDomain(taskEntities: TaskEntitySqlite[]): Task[] {
    return taskEntities.map((taskEntity) => this.mapEntityToDomain(taskEntity));
  }
}
