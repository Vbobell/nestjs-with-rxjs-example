import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindUserTasksUseCase
  implements UseCase<number, Observable<UserTask>>
{
  constructor(
    private readonly userTaskRepository: UserTaskRepository<unknown>,
  ) {}

  execute(userId: number): Observable<UserTask> {
    return this.userTaskRepository.getUserTasks(userId);
  }
}
