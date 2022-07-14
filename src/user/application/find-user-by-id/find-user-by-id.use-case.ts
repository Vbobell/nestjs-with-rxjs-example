import { Injectable, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindUserByIdUseCase implements UseCase<number, Observable<User>> {
  private readonly logger = new Logger(FindUserByIdUseCase.name);

  constructor(private readonly userRepository: UserRepository<unknown>) {}

  execute(userId: number): Observable<User> {
    this.logger.log(`execute | execution started | userId: ${userId}`);

    return this.userRepository.getUserById(userId).pipe(
      tap((user: User) => {
        this.logger.log(
          `getUserById | finished execution | userId: ${userId} | user: ${user}`,
        );
      }),
    );
  }
}
