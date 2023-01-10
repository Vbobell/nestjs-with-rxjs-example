import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TaskBoardRepository } from '@app/task-board/domain/abstract/task-board.repository';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindTaskBoardByIdUseCase
  implements UseCase<number, Observable<TaskBoard>>
{
  private readonly logger = new Logger(FindTaskBoardByIdUseCase.name);

  constructor(
    private readonly taskBoardRepository: TaskBoardRepository<unknown>,
  ) {}

  execute(id: number): Observable<TaskBoard> {
    return this.taskBoardRepository.getTaskBoardById(id).pipe(
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
