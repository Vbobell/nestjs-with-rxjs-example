import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';

export interface TaskEntityMemory {
  title: string;
  description: string;
  user?: Pick<UserEntitySqlite, 'id'>;
}
