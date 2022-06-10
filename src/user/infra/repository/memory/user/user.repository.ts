import { map, Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { User } from '@/app/user/domain/interface/user.interface';
import { UserRepository } from '@/app/user/domain/abstract/user.repository';

import * as USERS from '@/app/user/infra/database/db.json';
import { UserEntityMemory } from '@/app/user/infra/repository/memory/user/entity/user.entity';

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  getUsers(): Observable<User[]> {
    return of(USERS).pipe(
      map((userEntitiesMemoryObservable: UserEntityMemory[]) =>
        this.mapEntitiesObservableToDomain(userEntitiesMemoryObservable),
      ),
    );
  }

  getUserById(userId: number): Observable<User> {
    return of(USERS).pipe(
      map((userEntitiesMemoryObservable: UserEntityMemory[]) => {
        const userEntity = this.findUser(userEntitiesMemoryObservable, userId);

        if (userEntity) {
          return this.mapEntityToDomain(userEntity);
        }

        return undefined;
      }),
    );
  }

  private mapEntitiesObservableToDomain(
    userEntitiesMemoryObservable: UserEntityMemory[],
  ): User[] {
    return userEntitiesMemoryObservable.map((userEntity) =>
      this.mapEntityToDomain(userEntity),
    );
  }

  private findUser(
    userEntitiesMemory: UserEntityMemory[],
    userId: number,
  ): UserEntityMemory {
    const user = userEntitiesMemory.find(
      (userEntity) => userEntity.id === userId,
    );

    if (user) {
      return user;
    }

    return undefined;
  }

  private mapEntityToDomain(userEntity: UserEntityMemory) {
    const user: User = {
      name: userEntity.name,
    };

    return user;
  }
}
