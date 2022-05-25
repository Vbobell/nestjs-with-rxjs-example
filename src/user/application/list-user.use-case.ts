import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AbstractUseCase } from '@/app/common/application/abstract.use-case';

import { User } from '@/app/user/domain/user/interface/user.interface';
import { UserRepository } from '@/app/user/domain/user/abstract/user.repository';

@Injectable()
export class ListUserUseCase
  implements AbstractUseCase<unknown, Observable<User[]>>
{
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Observable<User[]> {
    return this.userRepository.getUsers();
  }
}
