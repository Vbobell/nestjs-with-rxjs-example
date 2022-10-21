import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';
import { UserRepositorySqlite } from '@app/user/infra/repository/sqlite/user.repository';

import { CheckExistUserUseCase } from '@app/user/application/check-exist-user/check-exist-user.use-case';
import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';
import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

import { UserController } from '@app/user/interface/http/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitySqlite])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositorySqlite,
    },
    ListUserUseCase,
    FindUserByIdUseCase,
    CheckExistUserUseCase,
  ],
  exports: [ListUserUseCase, FindUserByIdUseCase, CheckExistUserUseCase],
  controllers: [UserController],
})
export class UserModule {}
