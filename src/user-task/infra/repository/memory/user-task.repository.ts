import { Injectable, Logger } from '@nestjs/common';
import { map, Observable, of, tap } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

import * as TASKS from '@app/common/infra/database/task.db.json';
import { TaskEntityMemory } from '@app/task/infra/repository/memory/entity/task.entity';
import { UserTaskEntityMemory } from '@app/user-task/infra/repository/memory/entity/user-task.entity';

@Injectable()
export class UserTaskRepositoryMemory
  implements UserTaskRepository<UserTaskEntityMemory>
{
  private readonly logger = new Logger(UserTaskRepositoryMemory.name);

  getUserTasks(userId: number): Observable<UserTask> {
    this.logger.log(`getUserTasks | execution started | userId: ${userId}`);

    return of(TASKS).pipe(
      map((taskEntities: TaskEntityMemory[]) => {
        return this.filterUserTasks(userId, taskEntities);
      }),
      tap((taskEntityMemory: TaskEntityMemory[]) => {
        this.logger.log(
          `getUserTasks | filter user tasks finished | userId: ${userId} | number of tasks: ${taskEntityMemory.length}`,
        );
      }),
      map((tasks: TaskEntityMemory[]) => {
        return this.mapEntityToDomain({ user: { id: userId }, tasks });
      }),
      tap(() => {
        this.logger.log(
          `getUserTasks | finished execution | userId: ${userId}`,
        );
      }),
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
