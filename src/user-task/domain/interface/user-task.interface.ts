import { Task } from '@app/task/domain/interface/task.interface';
import { User } from '@app/user/domain/interface/user.interface';

export interface UserTask {
  user: Pick<User, 'id'>;
  tasks: Pick<Task, 'description' | 'title'>[];
}
