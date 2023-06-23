import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindTaskUseCase implements UseCase<number, Observable<Task>> {
  private readonly logger = new Logger(FindTaskUseCase.name);

  constructor(private readonly taskRepository: TaskRepository<unknown>) {}

  execute(id: number): Observable<Task> {
    return this.taskRepository.getTask(id).pipe(
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
