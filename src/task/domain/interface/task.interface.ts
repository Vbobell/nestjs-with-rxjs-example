import { User } from '@app/user/domain/interface/user.interface';

export interface Task {
  title: string;
  description: string;
  user?: Pick<User, 'id'>;
}
