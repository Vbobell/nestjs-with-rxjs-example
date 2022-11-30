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
import { Observable, switchMap } from 'rxjs';

import { NotFoundResponseExceptionDTO } from '@app/common/domain/dto/not-found-response.exception.dto';
import { UserTasksResponseDTO } from '@app/user-task/domain/dto/user-task.dto';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { FindUserTasksUseCase } from '@app/user-task/application/find-user-tasks/find-user-tasks.use-case';
import { CheckExistUserUseCase } from '@app/user/application/check-exist-user/check-exist-user.use-case';

@Controller('user-task')
export class UserTaskController {
  private readonly logger = new Logger(UserTaskController.name);

  constructor(
    private readonly checkExistUserUseCase: CheckExistUserUseCase,
    private readonly findUserTasksUseCase: FindUserTasksUseCase,
  ) {}

  @Get('/find/:id')
  @ApiTags('user-task')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'find user tasks by id',
    type: UserTasksResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'user not found',
    type: NotFoundResponseExceptionDTO,
  })
  @HttpCode(200)
  findUserTasksById(
    @Param('id', ParseIntPipe) userId: number,
  ): Observable<UserTasksResponseDTO> {
    return this.checkExistUserUseCase.execute(userId).pipe(
      loggerOperator(this.logger, {
        initLog: {
          message: `findUserTasksById | init check exist user finished | userId: ${userId}`,
        },
        endLog: {
          message: `findUserTasksById | check exist user finished | userId: ${userId}`,
        },
        errorLog: {
          message: `findUserTasksById | check exist user with error | userId: ${userId}`,
        },
      }),
      switchMap((existUser) => {
        if (!existUser) {
          throw new NotFoundResponseExceptionDTO('User not found');
        }

        return this.findUserTasksUseCase.execute(userId);
      }),
      loggerOperator(this.logger, {
        initLog: {
          message: `findUserTasksById | init find user execution | userId: ${userId}`,
        },
        endLog: {
          message: `findUserTasksById | find user finished | userId: ${userId}`,
        },
        errorLog: {
          message: `findUserTasksById | find user execution with error | userId: ${userId}`,
        },
      }),
    );
  }
}
