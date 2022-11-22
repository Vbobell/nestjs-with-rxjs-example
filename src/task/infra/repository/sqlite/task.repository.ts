import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { Repository } from 'typeorm';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';

@Injectable()
export class TaskRepositorySqlite implements TaskRepository<TaskEntitySqlite> {
  private readonly logger = new Logger(TaskEntitySqlite.name);

  constructor(
    @InjectRepository(TaskEntitySqlite)
    private readonly repository: Repository<TaskEntitySqlite>,
  ) {}

  getTasks(): Observable<Task[]> {
    this.logger.log('getTasks | execution started');

    return from(this.repository.find()).pipe(
      map((taskEntities: TaskEntitySqlite[]) =>
        this.mapEntitiesToDomain(taskEntities),
      ),
      tap((tasks: Task[]) => {
        this.logger.log(
          `getTasks | finished execution | number of tasks: ${tasks.length}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('getTasks | execution with error', error);
        throw error;
      }),
    );
  }

  mapEntityToDomain(taskEntityMemory: TaskEntitySqlite): Task {
    const task: Task = {
      title: taskEntityMemory.title,
      description: taskEntityMemory.description,
      ...(taskEntityMemory.user ? { user: taskEntityMemory.user } : {}),
    };

    return task;
  }

  mapEntitiesToDomain(taskEntities: TaskEntitySqlite[]): Task[] {
    return taskEntities.map((taskEntity) => this.mapEntityToDomain(taskEntity));
  }
}
