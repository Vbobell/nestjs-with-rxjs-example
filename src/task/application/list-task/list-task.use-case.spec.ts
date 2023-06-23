import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('ListTaskUseCase', () => {
  let useCase: ListTaskUseCase;
  let repository: TaskRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: TaskRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getTasks: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
        ListTaskUseCase,
      ],
    }).compile();

    useCase = module.get<ListTaskUseCase>(ListTaskUseCase);
    repository = module.get<TaskRepository<unknown>>(TaskRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get list tasks', () => {
    test('Then get list tasks with success', (done) => {
      useCase.execute().subscribe(() => {
        expect(repository.getTasks).toHaveBeenCalled();
        done();
      });
    });
  });
});
