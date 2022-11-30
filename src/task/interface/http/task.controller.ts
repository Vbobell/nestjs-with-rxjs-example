import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { TaskResponseDTO } from '@app/task/domain/dto/task-response.dto';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

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
      loggerOperator(this.logger, {
        initLog: {
          message: 'listTasks | execution started',
        },
        endLog: {
          message: 'listTasks | finished execution',
        },
        errorLog: {
          message: 'listTasks | execution with error',
        },
      }),
    );
  }
}
