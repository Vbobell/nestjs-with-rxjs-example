import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

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
    return this.userTaskRepository.getUserTasksById(userId).pipe(
      loggerOperator(this.logger, {
        initLog: {
          message: `execute | execution started | userId: ${userId}`,
        },
        endLog: {
          message: `execute | finished execution | userId: ${userId}`,
        },
        errorLog: {
          message: `execute | execution with error | userId: ${userId}`,
        },
      }),
    );
  }
}
