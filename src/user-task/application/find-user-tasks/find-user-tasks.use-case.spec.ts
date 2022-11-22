import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';

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
              getUserTasksById: jest.fn(),
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
    let userTasks: UserTask;

    beforeEach(() => {
      userTasks = {
        tasks: [
          {
            title: 'Task 3',
            description: 'Description task 3',
          },
        ],
        user: {
          id: 1,
        },
      };
    });

    test('Then find user tasks with success', (done) => {
      jest.spyOn(repository, 'getUserTasksById').mockReturnValue(
        new Observable<UserTask>((subscribe) => {
          subscribe.next(userTasks);
          subscribe.complete();
        }),
      );

      useCase.execute(1).subscribe((result) => {
        expect(result).toEqual(userTasks);
        done();
      });
    });

    test('Then user tasks not found', (done) => {
      jest.spyOn(repository, 'getUserTasksById').mockReturnValue(
        new Observable<UserTask>((subscribe) => {
          subscribe.next({ ...userTasks, tasks: [] });
          subscribe.complete();
        }),
      );

      useCase.execute(1).subscribe((result) => {
        expect(result).toEqual({ ...userTasks, tasks: [] });
        done();
      });
    });
  });
});
