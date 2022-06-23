import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import * as TASKS from '@app/task/infra/database/db.json';
import { TaskEntityMemory } from '@app/task/infra/repository/memory/entity/task.entity';

@Injectable()
export class TaskRepositoryMemory implements TaskRepository<TaskEntityMemory> {
  getTasks(): Observable<Task[]> {
    return of(TASKS).pipe(
      map((taskEntities: TaskEntityMemory[]) =>
        this.mapEntitiesToDomain(taskEntities),
      ),
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
