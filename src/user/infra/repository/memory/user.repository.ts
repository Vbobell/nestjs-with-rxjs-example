import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import * as USERS from '@app/common/infra/database/user.db.json';
import { UserEntityMemory } from '@app/user/infra/repository/memory/entity/user.entity';

@Injectable()
export class UserRepositoryMemory implements UserRepository<UserEntityMemory> {
  private readonly logger = new Logger(UserRepositoryMemory.name);

  getUsers(): Observable<User[]> {
    this.logger.log('getUsers | execution started');

    return of(USERS).pipe(
      map((userEntities: UserEntityMemory[]) =>
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

    return of(USERS).pipe(
      map((userEntities: UserEntityMemory[]) => {
        const userEntity = this.findUser(userEntities, userId);

        if (!userEntity) {
          throw new Error('User not found');
        }

        return this.mapEntityToDomain(userEntity);
      }),
      tap((user: User) => {
        this.logger.log(
          `getUserById | finished execution | userId: ${userId} | user: ${user}`,
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

    return of(USERS).pipe(
      map((userEntities: UserEntityMemory[]) => {
        const userEntity = this.findUser(userEntities, userId);

        if (userEntity) {
          return true;
        }

        return false;
      }),
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

  mapEntityToDomain(userEntity: UserEntityMemory) {
    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
    };

    return user;
  }

  mapEntitiesToDomain(userEntities: UserEntityMemory[]): User[] {
    return userEntities.map((userEntity) => this.mapEntityToDomain(userEntity));
  }

  private findUser(
    userEntities: UserEntityMemory[],
    userId: number,
  ): UserEntityMemory {
    const user = userEntities.find((userEntity) => userEntity.id === userId);

    if (user) {
      return user;
    }

    return undefined;
  }
}
