import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

import * as TASKS from '@app/common/infra/database/task.db.json';
import { TaskEntityMemory } from '@app/task/infra/repository/memory/entity/task.entity';
import { UserTaskEntityMemory } from '@app/user-task/infra/repository/memory/entity/user-task.entity';

@Injectable()
export class UserTaskRepositoryMemory
  implements UserTaskRepository<UserTaskEntityMemory>
{
  getUserTasks(userId: number): Observable<UserTask> {
    return of(TASKS).pipe(
      map((taskEntities: TaskEntityMemory[]) =>
        this.filterUserTasks(userId, taskEntities),
      ),
      map((tasks: TaskEntityMemory[]) =>
        this.mapEntityToDomain({ user: { id: userId }, tasks }),
      ),
    );
  }

  mapEntityToDomain(userTaskEntityMemory: UserTaskEntityMemory): UserTask {
    return {
      user: userTaskEntityMemory.user,
      tasks: userTaskEntityMemory.tasks.map((task) => ({
        description: task.description,
        title: task.title,
      })),
    };
  }

  private filterUserTasks(userId: number, taskEntities: TaskEntityMemory[]) {
    return taskEntities.filter((task) => task?.user?.id === userId);
  }
}
