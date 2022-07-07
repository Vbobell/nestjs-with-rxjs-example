import { TaskEntityMemory } from '@app/task/infra/repository/memory/entity/task.entity';
import { UserEntityMemory } from '@app/user/infra/repository/memory/entity/user.entity';

export interface UserTaskEntityMemory {
  user: Pick<UserEntityMemory, 'id'>;
  tasks: Pick<TaskEntityMemory, 'title' | 'description'>[];
}
