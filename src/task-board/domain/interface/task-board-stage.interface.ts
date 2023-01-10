import { Task } from '@app/task/domain/interface/task.interface';

export interface TaskBoardStage {
  boardId: number;
  name: string;
  id?: number;
  description?: string;
  tasks?: Task[];
}
