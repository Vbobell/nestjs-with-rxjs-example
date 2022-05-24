import { map, Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { User } from '@/app/user/domain/user/interface/user.interface';
import { UserRepository } from '@/app/user/domain/user/abstract/user.repository';

import * as USERS from '@/app/user/infra/database/db.json';
import { UserEntityMemory } from '@/app/user/infra/repository/memory/user/entity/user.entity';

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  /**
   *
   * @description
   *  QUANDO Busca os usuários e faz a conversão para a o tipo `User[]`.
   *
   *  E através da função `mapEntitiesToDomain`.
   *
   *  ENTÃO retorna a lista de usuários.
   *
   */
  getUsers(): Observable<User[]> {
    return this.mapEntitiesToDomain(USERS);
  }

  /**
   *
   * @description
   *  QUANDO executada a função.
   *
   *  E é recebido por parametro as entidades do tipo `UserEntityMemory`.
   *
   *  E converte um objeto para o tipo `Observable`.
   *
   *  E em conjunto com o operador do rxjs `map` faz um mapeamento da stream de dados do `Observable`.
   *
   *  E através da função de callback do `map`.
   *
   *  ENTÃO retorna os dados da stream.
   *
   * @param userEntityMemory array de entidades do JSON.
   */
  private mapEntitiesToDomain(
    userEntityMemory: UserEntityMemory[],
  ): Observable<User[]> {
    return of(userEntityMemory).pipe(
      map((users) => {
        return users.map((user) => {
          return {
            name: user.name,
          } as User;
        });
      }),
    );
  }
}
