import { Injectable, Logger } from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class CheckExistUserUseCase
  implements UseCase<number, Observable<boolean>>
{
  private readonly logger = new Logger(CheckExistUserUseCase.name);

  constructor(private readonly userRepository: UserRepository<unknown>) {}

  execute(userId: number): Observable<boolean> {
    this.logger.log(`execute | execution started | userId: ${userId}`);

    return this.userRepository.checkExistUserById(userId).pipe(
      tap((existUser: boolean) => {
        this.logger.log(
          `execute | finished execution | userId: ${userId} | existUser: ${existUser}`,
        );
      }),
      catchError((error: unknown) => {
        this.logger.error(
          `execute | execution with error | userId: ${userId}`,
          error,
        );
        throw error;
      }),
    );
  }
}
