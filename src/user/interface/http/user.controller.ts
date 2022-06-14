import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { UserDTO } from '@app/user/domain/dto/user.dto';

import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';
import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly listUserUseCase: ListUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Get('/list')
  @ApiTags('user')
  @ApiOkResponse({ description: 'users list', type: [UserDTO] })
  @HttpCode(200)
  listUsers(): Observable<UserDTO[]> {
    return this.listUserUseCase.execute();
  }

  @Get('/find/:userId')
  @ApiTags('users')
  @ApiOkResponse({ description: 'find user by id', type: UserDTO })
  @HttpCode(200)
  findUserById(@Param('userId') userId: number): Observable<UserDTO> {
    return this.findUserByIdUseCase.execute(userId);
  }
}
