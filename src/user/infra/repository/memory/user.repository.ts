import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import * as USERS from '@app/common/infra/database/user.db.json';
import { UserEntityMemory } from '@app/user/infra/repository/memory/entity/user.entity';

@Injectable()
export class UserRepositoryMemory implements UserRepository<UserEntityMemory> {
  getUsers(): Observable<User[]> {
    return of(USERS).pipe(
      map((userEntities: UserEntityMemory[]) =>
        this.mapEntitiesToDomain(userEntities),
      ),
    );
  }

  getUserById(userId: number): Observable<User> {
    return of(USERS).pipe(
      map((userEntities: UserEntityMemory[]) => {
        const userEntity = this.findUser(userEntities, userId);

        if (userEntity) {
          return this.mapEntityToDomain(userEntity);
        }

        return undefined;
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
