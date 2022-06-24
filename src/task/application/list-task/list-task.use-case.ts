import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class ListTaskUseCase implements UseCase<undefined, Observable<Task[]>> {
  constructor(private readonly taskRepository: TaskRepository<unknown>) {}

  execute(): Observable<Task[]> {
    return this.taskRepository.getTasks();
  }
}
