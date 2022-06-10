import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class ListUserUseCase implements UseCase<undefined, Observable<User[]>> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Observable<User[]> {
    return this.userRepository.getUsers();
  }
}
