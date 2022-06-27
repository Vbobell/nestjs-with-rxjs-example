import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { UserResponseDTO } from '@app/user/domain/dto/user-response.dto';

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
  @ApiOkResponse({ description: 'users list', type: [UserResponseDTO] })
  @HttpCode(200)
  listUsers(): Observable<UserResponseDTO[]> {
    return this.listUserUseCase.execute();
  }

  @Get('/find/:id')
  @ApiTags('users')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'find user by id', type: UserResponseDTO })
  @HttpCode(200)
  findUserById(
    @Param('id', ParseIntPipe) userId: number,
  ): Observable<UserResponseDTO> {
    return this.findUserByIdUseCase.execute(userId);
  }
}
