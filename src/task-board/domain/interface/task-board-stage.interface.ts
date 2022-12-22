import { Task } from '@app/task/domain/interface/task.interface';

export interface TaskBoardStage {
  boardId: number;
  name: string;
  description?: string;
  tasks?: Task[];
}
