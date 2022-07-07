import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class CheckExistUserUseCase
  implements UseCase<number, Observable<boolean>>
{
  constructor(private readonly userRepository: UserRepository<unknown>) {}

  execute(userId: number): Observable<boolean> {
    return this.userRepository.checkExistUserById(userId);
  }
}
