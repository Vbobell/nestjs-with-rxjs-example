import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { TaskRepository } from '@app/task/domain/abstract/task.repository';

import { FindTaskByBoardIdAndBoardStageIdUseCase } from '@app/task/application/find-task-by-board-id-and-board-stage-id/find-task-by-board-id-and-board-stage-id.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('FindTaskByBoardIdAndBoardStageIdUseCase', () => {
  let useCase: FindTaskByBoardIdAndBoardStageIdUseCase;
  let repository: TaskRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: TaskRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getTaskByBoardIdAndBoardStageId: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
        FindTaskByBoardIdAndBoardStageIdUseCase,
      ],
    }).compile();

    useCase = module.get<FindTaskByBoardIdAndBoardStageIdUseCase>(
      FindTaskByBoardIdAndBoardStageIdUseCase,
    );
    repository = module.get<TaskRepository<unknown>>(TaskRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When find task by board id and board stage id', () => {
    test('Then get task with success', (done) => {
      useCase.execute({ boardId: 1, boardStageId: 1 }).subscribe(() => {
        expect(repository.getTaskByBoardIdAndBoardStageId).toHaveBeenCalled();
        expect(repository.getTaskByBoardIdAndBoardStageId).toHaveBeenCalledWith(
          { boardId: 1, boardStageId: 1 },
        );
        done();
      });
    });

    describe('And task not found', () => {
      let errorMock;

      beforeEach(() => {
        errorMock = new NotFoundException('Task not found');

        jest
          .spyOn(repository, 'getTaskByBoardIdAndBoardStageId')
          .mockImplementation(() => {
            return new Observable((subscribe) => {
              subscribe.error(errorMock);
              subscribe.complete();
            });
          });
      });

      test('Then user not found', (done) => {
        useCase.execute({ boardId: 3, boardStageId: 3 }).subscribe({
          error: (error) => {
            expect(
              repository.getTaskByBoardIdAndBoardStageId,
            ).toHaveBeenCalled();
            expect(
              repository.getTaskByBoardIdAndBoardStageId,
            ).toHaveBeenCalledWith({ boardId: 3, boardStageId: 3 });

            expect(error.message).toEqual('Task not found');

            done();
          },
        });
      });
    });
  });
});
