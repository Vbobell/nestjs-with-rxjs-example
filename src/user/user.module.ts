import { Module } from '@nestjs/common';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { UserRepositoryMemory } from '@app/user/infra/repository/memory/user.repository';

import { CheckExistUserUseCase } from '@app/user/application/check-exist-user/check-exist-user.use-case';
import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';
import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

import { UserController } from '@app/user/interface/http/user.controller';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
    ListUserUseCase,
    FindUserByIdUseCase,
    CheckExistUserUseCase,
  ],
  exports: [ListUserUseCase, FindUserByIdUseCase, CheckExistUserUseCase],
  controllers: [UserController],
})
export class UserModule {}
