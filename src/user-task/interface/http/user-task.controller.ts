import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable, of, switchMap } from 'rxjs';

import { UserTasksResponseDTO } from '@app/user-task/domain/dto/user-task.dto';

import { FindUserTasksUseCase } from '@app/user-task/application/find-user-tasks/find-user-tasks.use-case';
import { CheckExistUserUseCase } from '@app/user/application/check-exist-user/check-exist-user.use-case';

@Controller('user-task')
export class UserTaskController {
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
  @HttpCode(200)
  findUserTasksById(
    @Param('id', ParseIntPipe) userId: number,
  ): Observable<UserTasksResponseDTO> {
    return this.checkExistUserUseCase.execute(userId).pipe(
      switchMap((existUser) => {
        if (existUser) {
          return this.findUserTasksUseCase.execute(userId);
        }

        return of(undefined);
      }),
    );
  }
}
