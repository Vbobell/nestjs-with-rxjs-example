import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Observable, tap } from 'rxjs';

import { UserResponseDTO } from '@app/user/domain/dto/user-response.dto';

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
    this.logger.log('listUsers | execution started');

    return this.listUserUseCase.execute().pipe(
      tap((users: UserResponseDTO[]) => {
        this.logger.log(
          `listUsers | finished execution | number of users: ${users.length}`,
        );
      }),
    );
  }

  @Get('/find/:id')
  @ApiTags('user')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'find user by id', type: UserResponseDTO })
  @HttpCode(200)
  findUserById(
    @Param('id', ParseIntPipe) userId: number,
  ): Observable<UserResponseDTO> {
    this.logger.log(`findUserById | execution started | userId: ${userId}`);

    return this.findUserByIdUseCase.execute(userId).pipe(
      tap((user: UserResponseDTO) => {
        this.logger.log(
          `findUserById | finished execution | userId: ${userId} | user: ${user}`,
        );
      }),
    );
  }
}
