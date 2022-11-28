import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';

import { UseCase } from '@app/common/application/abstract.use-case';

@Injectable()
export class ListUserUseCase implements UseCase<undefined, Observable<User[]>> {
  private readonly logger = new Logger(ListUserUseCase.name);

  constructor(private readonly userRepository: UserRepository<unknown>) {}

  execute(): Observable<User[]> {
    this.logger.log('execute | execution started');

    return this.userRepository.getUsers().pipe(
      loggerOperator(this.logger, {
        initLog: {
          message: `execute | execution started`,
        },
        endLog: {
          message: `execute | finished execution`,
        },
        errorLog: {
          message: `execute | execution with error`,
        },
      }),
    );
  }
}
