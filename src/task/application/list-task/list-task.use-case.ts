import { Injectable, Logger } from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class ListTaskUseCase implements UseCase<undefined, Observable<Task[]>> {
  private readonly logger = new Logger(ListTaskUseCase.name);

  constructor(private readonly taskRepository: TaskRepository<unknown>) {}

  execute(): Observable<Task[]> {
    this.logger.log('execute | execution started');

    return this.taskRepository.getTasks().pipe(
      tap((tasks: Task[]) => {
        this.logger.log(
          `execute | finished execution | number of tasks: ${tasks.length}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('execute | execution with error', error);
        throw error;
      }),
    );
  }
}
