import { Module } from '@nestjs/common';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { UserRepositoryMemory } from '@app/user/infra/repository/memory/user/user.repository';

import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';
import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

import { UserController } from '@app/user/interface/http/users.controller';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
    ListUserUseCase,
    FindUserByIdUseCase,
  ],
  exports: [ListUserUseCase, FindUserByIdUseCase],
  controllers: [UserController],
})
export class UserModule {}
