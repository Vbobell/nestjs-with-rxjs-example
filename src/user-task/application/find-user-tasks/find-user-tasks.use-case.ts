import { Injectable, Logger } from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindUserTasksUseCase
  implements UseCase<number, Observable<UserTask>>
{
  private readonly logger = new Logger(FindUserTasksUseCase.name);

  constructor(
    private readonly userTaskRepository: UserTaskRepository<unknown>,
  ) {}

  execute(userId: number): Observable<UserTask> {
    this.logger.log(`execute | execution started | userId: ${userId}`);

    return this.userTaskRepository.getUserTasks(userId).pipe(
      tap(() => {
        this.logger.log(`execute | finished execution | userId: ${userId}`);
      }),
      catchError((error: unknown) => {
        this.logger.error(
          `execute | execution with error | userId: ${userId}`,
          error,
        );
        throw error;
      }),
    );
  }
}
