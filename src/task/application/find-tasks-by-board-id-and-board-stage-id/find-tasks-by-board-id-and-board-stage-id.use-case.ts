import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindTasksByBoardIdAndBoardStageIdUseCase
  implements
    UseCase<Pick<Task, 'boardId' | 'boardStageId'>, Observable<Task[]>>
{
  private readonly logger = new Logger(
    FindTasksByBoardIdAndBoardStageIdUseCase.name,
  );

  constructor(private readonly taskRepository: TaskRepository<unknown>) {}

  execute(params: Pick<Task, 'boardId' | 'boardStageId'>): Observable<Task[]> {
    return this.taskRepository.getTasksByBoardIdAndBoardStageId(params).pipe(
      loggerOperator(this.logger, {
        initLog: {
          message: 'execute | execution started',
        },
        endLog: {
          message: 'execute | finished execution',
        },
        errorLog: {
          message: 'execute | execution with error',
        },
      }),
    );
  }
}
