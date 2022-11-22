import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { Repository } from 'typeorm';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';

@Injectable()
export class UserRepositorySqlite implements UserRepository<UserEntitySqlite> {
  private readonly logger = new Logger(UserRepositorySqlite.name);

  constructor(
    @InjectRepository(UserEntitySqlite)
    private readonly repository: Repository<UserEntitySqlite>,
  ) {}

  getUsers(): Observable<User[]> {
    this.logger.log('getUsers | execution started');

    return from(this.repository.find()).pipe(
      map((userEntities: UserEntitySqlite[]) =>
        this.mapEntitiesToDomain(userEntities),
      ),
      tap((users: User[]) => {
        this.logger.log(
          `getUsers | finished execution | number of users: ${users.length}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('getUsers | execution with error', error);
        throw error;
      }),
    );
  }

  getUserById(userId: number): Observable<User> {
    this.logger.log(`getUserById | execution started | userId: ${userId}`);

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
      tap((user: User) => {
        this.logger.log(
          `getUserById | finished execution | userId: ${userId} | user: ${JSON.stringify(
            user,
          )}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('getUserById | execution with error', error);
        throw error;
      }),
    );
  }

  checkExistUserById(userId: number): Observable<boolean> {
    this.logger.log(
      `checkExistUserById | execution started | userId: ${userId}`,
    );

    return from(
      this.repository.countBy({
        id: userId,
      }),
    ).pipe(
      map((count: number) => count > 0),
      tap((existUser: boolean) => {
        this.logger.log(
          `checkExistUserById | finished execution | userId: ${userId} | existUser: ${existUser}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error('checkExistUserById | execution with error', error);
        throw error;
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
