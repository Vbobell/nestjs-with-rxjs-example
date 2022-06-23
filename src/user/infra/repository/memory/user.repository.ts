import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import * as USERS from '@app/user/infra/database/db.json';
import { UserEntityMemory } from '@app/user/infra/repository/memory/entity/user.entity';

@Injectable()
export class UserRepositoryMemory implements UserRepository {
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

  private mapEntityToDomain(userEntity: UserEntityMemory) {
    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
    };

    return user;
  }

  private mapEntitiesToDomain(userEntities: UserEntityMemory[]): User[] {
    return userEntities.map((userEntity) => this.mapEntityToDomain(userEntity));
  }
}
