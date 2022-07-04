import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { TaskResponseDTO } from '@app/task/domain/dto/task-response.dto';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

@Controller('task')
export class TaskController {
  constructor(private readonly listTaskUseCase: ListTaskUseCase) {}

  @Get('/list')
  @ApiTags('task')
  @ApiOkResponse({ description: 'task list', type: [TaskResponseDTO] })
  @HttpCode(200)
  listTasks(): Observable<TaskResponseDTO[]> {
    return this.listTaskUseCase.execute();
  }
}
