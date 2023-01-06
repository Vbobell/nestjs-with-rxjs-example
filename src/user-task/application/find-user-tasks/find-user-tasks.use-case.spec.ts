import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';

import { FindUserTasksUseCase } from '@app/user-task/application/find-user-tasks/find-user-tasks.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('FindUserTasksUseCaseService', () => {
  let useCase: FindUserTasksUseCase;
  let repository: UserTaskRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        FindUserTasksUseCase,
        {
          provide: UserTaskRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getUserTasksById: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
      ],
    }).compile();

    useCase = module.get<FindUserTasksUseCase>(FindUserTasksUseCase);
    repository = module.get<UserTaskRepository<unknown>>(UserTaskRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get user tasks', () => {
    test('Then find user tasks with success', (done) => {
      useCase.execute(1).subscribe(() => {
        expect(repository.getUserTasksById).toHaveBeenCalled();
        expect(repository.getUserTasksById).toHaveBeenCalledWith(1);
        done();
      });
    });
  });
});
