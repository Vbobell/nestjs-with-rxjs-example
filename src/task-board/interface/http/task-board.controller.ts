import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

import { NotFoundResponseExceptionDTO } from '@app/common/domain/dto/not-found-response.exception.dto';
import { TaskBoardResponseDTO } from '@app/task-board/domain/dto/task-board-response.dto';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { TaskBoardService } from '@app/task-board/application/services/task-board/task-board.service';

import { TaskBoardResponseAdapter } from '@app/task-board/interface/http/task-board-response.adapter';

@Controller('task-board')
export class TaskBoardController {
  private readonly logger = new Logger(TaskBoardController.name);

  constructor(private readonly taskBoardService: TaskBoardService) {}

  @Get('/find/:boardId')
  @ApiTags('task-board')
  @ApiParam({ name: 'boardId' })
  @ApiOkResponse({
    description: 'find board and tasks by boardId',
    type: TaskBoardResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'board not found',
    type: NotFoundResponseExceptionDTO,
  })
  @HttpCode(200)
  findBoardAndTasksByBoardId(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Observable<TaskBoardResponseDTO> {
    return this.taskBoardService.getTaskBoardAndTasks(boardId).pipe(
      map((taskBoard: TaskBoard) => {
        return TaskBoardResponseAdapter.taskBoardToTaskBoardDTO(taskBoard);
      }),
      loggerOperator(this.logger, {
        initLog: {
          message: `findBoardAndTasksByBoardId | init check exist user finished | boardId: ${boardId}`,
        },
        endLog: {
          message: `findBoardAndTasksByBoardId | check exist user finished | boardId: ${boardId}`,
        },
        errorLog: {
          message: `findBoardAndTasksByBoardId | check exist user with error | boardId: ${boardId}`,
        },
      }),
    );
  }
}
