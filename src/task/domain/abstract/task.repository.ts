import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AbstractRepository } from '@app/common/domain/abstract/abstract.repository';
import { Task } from '@app/task/domain/interface/task.interface';

@Injectable()
export abstract class TaskRepository<T> extends AbstractRepository<T, Task> {
  abstract getTasks(): Observable<Task[]>;
}
