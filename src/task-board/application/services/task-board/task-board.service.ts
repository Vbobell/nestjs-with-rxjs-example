import { Injectable, Logger } from '@nestjs/common';
import { catchError, from, map, mergeMap, Observable, toArray } from 'rxjs';

import { TaskBoardStage } from '@app/task-board/domain/interface/task-board-stage.interface';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';
import { Task } from '@app/task/domain/interface/task.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { FindTaskBoardByIdUseCase } from '@app/task-board/application/use-case/find-task-board-by-id/find-task-board-by-id.use-case';
import { FindTasksByBoardIdAndBoardStageIdUseCase } from '@app/task/application/find-tasks-by-board-id-and-board-stage-id/find-tasks-by-board-id-and-board-stage-id.use-case';

@Injectable()
export class TaskBoardService {
  private readonly logger = new Logger(TaskBoardService.name);

  constructor(
    private readonly findTaskBoardByIdUseCase: FindTaskBoardByIdUseCase,
    private readonly findTaskByBoardIdAndBoardStageIdUseCase: FindTasksByBoardIdAndBoardStageIdUseCase,
  ) {}

  getTaskBoardAndTasks(taskBoardId: number): Observable<TaskBoard> {
    return this.findTaskBoardByIdUseCase
      .execute(taskBoardId)
      .pipe(
        mergeMap((taskBoard: TaskBoard) => {
          return this.mergeTasksToBoardStage(taskBoard.stages).pipe(
            map((stages: TaskBoardStage[]) => {
              return {
                ...taskBoard,
                stages,
              };
            }),
          );
        }),
      )
      .pipe(
        loggerOperator(this.logger, {
          initLog: {
            message: 'getTaskBoardAndTasks | execution started',
          },
          endLog: {
            message: 'getTaskBoardAndTasks | finished execution',
          },
          errorLog: {
            message: 'getTaskBoardAndTasks | execution with error',
          },
        }),
      );
  }

  private mergeTasksToBoardStage(
    stages: TaskBoardStage[],
  ): Observable<TaskBoardStage[]> {
    return from(stages).pipe(
      mergeMap((stage: TaskBoardStage) => {
        return this.findTaskByBoardIdAndBoardStageIdUseCase
          .execute({
            boardId: stage.boardId,
            boardStageId: stage.id,
          })
          .pipe(catchError(() => []))
          .pipe(
            map((tasks: Task[]) => {
              return {
                ...stage,
                tasks,
              };
            }),
          );
      }),
      toArray(),
    );
  }
}
