import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

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
