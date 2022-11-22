import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Repository } from '@app/common/domain/abstract/abstract.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

@Injectable()
export abstract class UserTaskRepository<T> extends Repository<T, UserTask> {
  abstract getUserTasksById(userId: number): Observable<UserTask>;
}
