import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Repository } from '@app/common/domain/abstract/abstract.repository';
import { Task } from '@app/task/domain/interface/task.interface';

@Injectable()
export abstract class TaskRepository<T> extends Repository<T, Task> {
  abstract getTasks(): Observable<Task[]>;
}
