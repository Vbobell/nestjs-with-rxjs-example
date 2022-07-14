import { Injectable, Logger } from '@nestjs/common';
import { map, Observable, of, tap } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import * as TASKS from '@app/common/infra/database/task.db.json';
import { TaskEntityMemory } from '@app/task/infra/repository/memory/entity/task.entity';

@Injectable()
export class TaskRepositoryMemory implements TaskRepository<TaskEntityMemory> {
  private readonly logger = new Logger(TaskRepositoryMemory.name);

  getTasks(): Observable<Task[]> {
    this.logger.log('getTasks | execution started');

    return of(TASKS).pipe(
      map((taskEntities: TaskEntityMemory[]) =>
        this.mapEntitiesToDomain(taskEntities),
      ),
      tap((tasks: Task[]) => {
        this.logger.log(
          `getTasks | finished execution | number of tasks: ${tasks.length}`,
        );
      }),
    );
  }

  mapEntityToDomain(taskEntityMemory: TaskEntityMemory): Task {
    const task: Task = {
      title: taskEntityMemory.title,
      description: taskEntityMemory.description,
      ...(taskEntityMemory.user ? { user: taskEntityMemory.user } : {}),
    };

    return task;
  }

  mapEntitiesToDomain(taskEntities: TaskEntityMemory[]): Task[] {
    return taskEntities.map((taskEntity) => this.mapEntityToDomain(taskEntity));
  }
}
