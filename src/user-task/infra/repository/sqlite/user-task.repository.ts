import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { Repository } from 'typeorm';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';

@Injectable()
export class UserTaskRepositorySqlite
  implements UserTaskRepository<TaskEntitySqlite>
{
  private readonly logger = new Logger(TaskEntitySqlite.name);

  constructor(
    @InjectRepository(TaskEntitySqlite)
    private readonly repository: Repository<TaskEntitySqlite>,
  ) {}

  getUserTasksById(userId: number): Observable<UserTask> {
    this.logger.log(`getUserTasks | execution started | userId: ${userId}`);

    return from(
      this.repository.find({
        where: {
          user: {
            id: userId,
          },
        },
      }),
    ).pipe(
      map((tasks: TaskEntitySqlite[]) => {
        const userTask = this.customMapEntityToDomain(tasks);

        if (userTask.user === undefined) {
          userTask.user = {
            id: userId,
          };
        }

        return userTask;
      }),
      tap(() => {
        this.logger.log(
          `getUserTasks | finished execution | userId: ${userId}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('getUserTasks | execution with error', error);
        throw error;
      }),
    );
  }

  customMapEntityToDomain(entities: TaskEntitySqlite[]): UserTask {
    const userTask: UserTask = entities.reduce<UserTask>(
      (accUserTask: UserTask, currentEntity: TaskEntitySqlite) => {
        const userTask: UserTask = {
          user: currentEntity.user,
          tasks: [
            ...accUserTask.tasks,
            {
              description: currentEntity.description,
              title: currentEntity.title,
            },
          ],
        };

        return userTask;
      },
      {
        user: undefined,
        tasks: [],
      },
    );

    return userTask;
  }
}
