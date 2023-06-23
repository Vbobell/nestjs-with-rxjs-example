import { TaskBoardStage } from '@app/task-board/domain/interface/task-board-stage.interface';

export interface TaskBoard {
  name: string;
  stages: TaskBoardStage[];
}
