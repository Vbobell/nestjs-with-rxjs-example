import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { FindTaskUseCase } from '@app/task/application/find-task/find-task.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('FindTaskUseCase', () => {
  let useCase: FindTaskUseCase;
  let repository: TaskRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: TaskRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getTask: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
        FindTaskUseCase,
      ],
    }).compile();

    useCase = module.get<FindTaskUseCase>(FindTaskUseCase);
    repository = module.get<TaskRepository<unknown>>(TaskRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get task', () => {
    test('Then get task with success', (done) => {
      useCase.execute(1).subscribe(() => {
        expect(repository.getTask).toHaveBeenCalled();
        expect(repository.getTask).toHaveBeenCalledWith(1);
        done();
      });
    });

    describe('And task not found', () => {
      let errorMock;

      beforeEach(() => {
        errorMock = new NotFoundException('Task not found');

        jest.spyOn(repository, 'getTask').mockImplementation(() => {
          return new Observable((subscribe) => {
            subscribe.error(errorMock);
            subscribe.complete();
          });
        });
      });

      test('Then user not found', (done) => {
        useCase.execute(3).subscribe({
          error: (error) => {
            expect(repository.getTask).toHaveBeenCalled();
            expect(repository.getTask).toHaveBeenCalledWith(3);

            expect(error.message).toEqual('Task not found');

            done();
          },
        });
      });
    });
  });
});
