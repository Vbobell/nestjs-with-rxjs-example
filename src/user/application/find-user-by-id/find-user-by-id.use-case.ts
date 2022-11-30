import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class FindUserByIdUseCase implements UseCase<number, Observable<User>> {
  private readonly logger = new Logger(FindUserByIdUseCase.name);

  constructor(private readonly userRepository: UserRepository<unknown>) {}

  execute(userId: number): Observable<User> {
    this.logger.log(`execute | execution started | userId: ${userId}`);

    return this.userRepository.getUserById(userId).pipe(
      loggerOperator(this.logger, {
        initLog: {
          message: `execute | execution started | userId: ${userId}`,
        },
        endLog: {
          message: `execute | finished execution | userId: ${userId}`,
        },
        errorLog: {
          message: `execute | execution with error | userId: ${userId}`,
        },
      }),
    );
  }
}
