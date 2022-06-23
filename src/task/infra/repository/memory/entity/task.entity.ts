import { UserEntityMemory } from '@app/user/infra/repository/memory/entity/user.entity';

export interface TaskEntityMemory {
  title: string;
  description: string;
  user?: Pick<UserEntityMemory, 'id'>;
}
