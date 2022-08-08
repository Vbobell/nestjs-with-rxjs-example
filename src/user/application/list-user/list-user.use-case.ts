import { Injectable, Logger } from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class ListUserUseCase implements UseCase<undefined, Observable<User[]>> {
  private readonly logger = new Logger(ListUserUseCase.name);

  constructor(private readonly userRepository: UserRepository<unknown>) {}

  execute(): Observable<User[]> {
    this.logger.log('execute | execution started');

    return this.userRepository.getUsers().pipe(
      tap((users: User[]) => {
        this.logger.log(
          `execute | finished execution | number of users: ${users.length}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error(`execute | execution with error`, error);
        throw error;
      }),
    );
  }
}
