import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';
import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';

@Injectable()
export class UserRepositorySqlite implements UserRepository<UserEntitySqlite> {
  private readonly logger = new Logger(UserRepositorySqlite.name);

  constructor(
    @InjectRepository(UserEntitySqlite)
    private readonly repository: Repository<UserEntitySqlite>,
  ) {}

  getUsers(): Observable<User[]> {
    return from(this.repository.find()).pipe(
      map((userEntities: UserEntitySqlite[]) =>
        this.mapEntitiesToDomain(userEntities),
      ),
      loggerOperator(this.logger, {
        initLog: { message: 'getUsers | execution started' },
        endLog: { message: 'getUsers | finished execution' },
        errorLog: { message: 'getUsers | execution with error' },
      }),
    );
  }

  getUserById(userId: number): Observable<User> {
    return from(
      this.repository.findOneBy({
        id: userId,
      }),
    ).pipe(
      map((userEntity: UserEntitySqlite) => {
        if (!userEntity) {
          throw new NotFoundException('User not found');
        }

        return this.mapEntityToDomain(userEntity);
      }),
      loggerOperator(this.logger, {
        initLog: {
          message: `getUserById | execution started | userId: ${userId}`,
        },
        endLog: {
          message: `getUserById | finished execution | userId: ${userId}`,
        },
        errorLog: {
          message: `getUserById | execution with error | userId: ${userId}`,
        },
      }),
    );
  }

  checkExistUserById(userId: number): Observable<boolean> {
    return from(
      this.repository.countBy({
        id: userId,
      }),
    ).pipe(
      map((count: number) => count > 0),
      loggerOperator(this.logger, {
        initLog: {
          message: `checkExistUserById | execution started | userId: ${userId}`,
        },
        endLog: {
          message: `checkExistUserById | finished execution | userId: ${userId}`,
        },
        errorLog: {
          message: `checkExistUserById | execution with error | userId: ${userId}`,
        },
      }),
    );
  }

  mapEntityToDomain(userEntity: UserEntitySqlite) {
    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
    };

    return user;
  }

  mapEntitiesToDomain(userEntities: UserEntitySqlite[]): User[] {
    return userEntities.map((userEntity) => this.mapEntityToDomain(userEntity));
  }
}
