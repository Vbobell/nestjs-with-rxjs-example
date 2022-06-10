import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindUserByIdUseCase implements UseCase<number, Observable<User>> {
  constructor(private readonly userRepository: UserRepository) {}

  execute(userId: number): Observable<User> {
    return this.userRepository.getUserById(userId);
  }
}
