import { TaskEntityMemory } from '@app/task/infra/repository/memory/entity/task.entity';
import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';

export interface UserTaskEntityMemory {
  user: Pick<UserEntitySqlite, 'id'>;
  tasks: Pick<TaskEntityMemory, 'title' | 'description'>[];
}
