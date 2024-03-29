import { User } from '@app/user/domain/interface/user.interface';

export interface Task {
  title: string;
  description: string;
  boardId?: number;
  boardStageId?: number;
  user?: Pick<User, 'id'>;
}
