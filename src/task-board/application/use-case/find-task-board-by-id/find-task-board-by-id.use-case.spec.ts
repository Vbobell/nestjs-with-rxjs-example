import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { TaskBoardRepository } from '@app/task-board/domain/abstract/task-board.repository';

import { FindTaskBoardByIdUseCase } from '@app/task-board/application/use-case/find-task-board-by-id/find-task-board-by-id.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('FindTaskBoardByIdUseCase', () => {
  let useCase: FindTaskBoardByIdUseCase;
  let repository: TaskBoardRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: TaskBoardRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getTaskBoardById: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
        FindTaskBoardByIdUseCase,
      ],
    }).compile();

    useCase = module.get<FindTaskBoardByIdUseCase>(FindTaskBoardByIdUseCase);
    repository = module.get<TaskBoardRepository<unknown>>(TaskBoardRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get task board', () => {
    test('Then get task board with success', (done) => {
      useCase.execute(1).subscribe(() => {
        expect(repository.getTaskBoardById).toHaveBeenCalled();
        expect(repository.getTaskBoardById).toHaveBeenCalledWith(1);
        done();
      });
    });

    describe('And task not found', () => {
      let errorMock;

      beforeEach(() => {
        errorMock = new NotFoundException('Task board not found');

        jest.spyOn(repository, 'getTaskBoardById').mockImplementation(() => {
          return new Observable((subscribe) => {
            subscribe.error(errorMock);
            subscribe.complete();
          });
        });
      });

      test('Then task board not found', (done) => {
        useCase.execute(3).subscribe({
          error: (error) => {
            expect(repository.getTaskBoardById).toHaveBeenCalled();
            expect(repository.getTaskBoardById).toHaveBeenCalledWith(3);

            expect(error.message).toEqual('Task board not found');

            done();
          },
        });
      });
    });
  });
});
