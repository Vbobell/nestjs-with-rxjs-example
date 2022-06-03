import { Module } from '@nestjs/common';

import { UserRepository } from '@/app/user/domain/user/abstract/user.repository';
import { UserRepositoryMemory } from '@/app/user/infra/repository/memory/user/user.repository';
import { ListUserUseCase } from '@/app/user/application/list-user.use-case';
import { UserController } from './interface/http/users.controller';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
    ListUserUseCase,
  ],
  exports: [ListUserUseCase],
  controllers: [UserController],
})
export class UserModule {}
