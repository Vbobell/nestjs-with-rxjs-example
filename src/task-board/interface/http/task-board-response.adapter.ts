import { TaskBoardResponseDTO } from '@app/task-board/domain/dto/task-board-response.dto';
import { TaskBoardStagesResponseDTO } from '@app/task-board/domain/dto/task-board-stage-response.dto';
import { TaskBoardStage } from '@app/task-board/domain/interface/task-board-stage.interface';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

export class TaskBoardResponseAdapter {
  static taskBoardToTaskBoardDTO(taskBoard: TaskBoard): TaskBoardResponseDTO {
    const stages = taskBoard.stages.map(
      (stage: TaskBoardStage) => new TaskBoardStagesResponseDTO({ ...stage }),
    );

    return new TaskBoardResponseDTO({
      name: taskBoard.name,
      stages,
    });
  }
}
