import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { catchError, Observable, tap } from 'rxjs';

import { TaskResponseDTO } from '@app/task/domain/dto/task-response.dto';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

@Controller('task')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private readonly listTaskUseCase: ListTaskUseCase) {}

  @Get('/list')
  @ApiTags('task')
  @ApiOkResponse({ description: 'task list', type: [TaskResponseDTO] })
  @HttpCode(200)
  listTasks(): Observable<TaskResponseDTO[]> {
    this.logger.log('listTasks | execution started');

    return this.listTaskUseCase.execute().pipe(
      tap((tasks: TaskResponseDTO[]) => {
        this.logger.log(
          `listTasks | finished execution | number of tasks: ${tasks.length}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('listTasks | execution with error', error);
        throw error;
      }),
    );
  }
}
