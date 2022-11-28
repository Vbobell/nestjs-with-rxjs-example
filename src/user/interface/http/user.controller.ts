import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { catchError, Observable } from 'rxjs';

import { NotFoundResponseExceptionDTO } from '@app/common/domain/dto/not-found-response.exception.dto';
import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { UserResponseDTO } from '@app/user/domain/dto/user-response.dto';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';
import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly listUserUseCase: ListUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Get('/list')
  @ApiTags('user')
  @ApiOkResponse({ description: 'users list', type: [UserResponseDTO] })
  @HttpCode(200)
  listUsers(): Observable<UserResponseDTO[]> {
    return this.listUserUseCase.execute().pipe(
      loggerOperator(this.logger, {
        initLog: { message: 'listUsers | execution started' },
        endLog: { message: 'listUsers | finished execution' },
        errorLog: { message: 'listUsers | execution with error' },
      }),
    );
  }

  @Get('/find/:id')
  @ApiTags('user')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'find user by id', type: UserResponseDTO })
  @ApiNotFoundResponse({
    description: 'user not found by id',
    type: NotFoundResponseExceptionDTO,
  })
  @HttpCode(200)
  findUserById(
    @Param('id', ParseIntPipe) userId: number,
  ): Observable<UserResponseDTO> {
    return this.findUserByIdUseCase.execute(userId).pipe(
      loggerOperator(this.logger, {
        initLog: { message: 'findUserById | execution started' },
        endLog: { message: 'findUserById | finished execution' },
        errorLog: { message: 'findUserById | execution with error' },
      }),
      catchError((error: unknown) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundResponseExceptionDTO(error.message);
        }

        throw error;
      }),
    );
  }
}
