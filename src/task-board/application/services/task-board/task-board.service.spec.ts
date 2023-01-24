import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';

import { TaskBoardService } from '@app/task-board/application/services/task-board/task-board.service';
import { FindTaskBoardByIdUseCase } from '@app/task-board/application/use-case/find-task-board-by-id/find-task-board-by-id.use-case';
import { FindTasksByBoardIdAndBoardStageIdUseCase } from '@app/task/application/find-tasks-by-board-id-and-board-stage-id/find-tasks-by-board-id-and-board-stage-id.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('TaskBoardService', () => {
  let service: TaskBoardService;
  let findTaskBoardByIdUseCase: FindTaskBoardByIdUseCase;
  let findTasksByBoardIdAndBoardStageIdUseCase: FindTasksByBoardIdAndBoardStageIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: FindTaskBoardByIdUseCase,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              execute: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
        {
          provide: FindTasksByBoardIdAndBoardStageIdUseCase,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              execute: jest.fn().mockImplementation(
                () =>
                  new Observable((subscribe) => {
                    subscribe.next();
                    subscribe.complete();
                  }),
              ),
            };
          }),
        },
        TaskBoardService,
      ],
    }).compile();

    service = module.get<TaskBoardService>(TaskBoardService);
    findTaskBoardByIdUseCase = module.get<FindTaskBoardByIdUseCase>(
      FindTaskBoardByIdUseCase,
    );
    findTasksByBoardIdAndBoardStageIdUseCase =
      module.get<FindTasksByBoardIdAndBoardStageIdUseCase>(
        FindTasksByBoardIdAndBoardStageIdUseCase,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(findTaskBoardByIdUseCase).toBeDefined();
    expect(findTasksByBoardIdAndBoardStageIdUseCase).toBeDefined();
  });

  describe('When get task board and tasks', () => {
    beforeEach(() => {
      jest.spyOn(findTaskBoardByIdUseCase, 'execute').mockImplementation(() => {
        return new Observable((subscribe) => {
          subscribe.next({
            name: 'Board 1',
            stages: [
              {
                id: 2,
                name: 'stage 2',
                boardId: 1,
              },
            ],
          });
          subscribe.complete();
        });
      });
    });

    test('Then get task board and tasks with success', (done) => {
      service.getTaskBoardAndTasks(1).subscribe(() => {
        expect(findTaskBoardByIdUseCase.execute).toHaveBeenCalled();
        expect(findTaskBoardByIdUseCase.execute).toHaveBeenCalledWith(1);

        expect(
          findTasksByBoardIdAndBoardStageIdUseCase.execute,
        ).toHaveBeenCalled();
        expect(
          findTasksByBoardIdAndBoardStageIdUseCase.execute,
        ).toHaveBeenCalledWith({
          boardId: 1,
          boardStageId: 2,
        });

        done();
      });
    });
  });

  describe('And task board has multiple board stage', () => {
    beforeEach(() => {
      jest.spyOn(findTaskBoardByIdUseCase, 'execute').mockImplementation(() => {
        return new Observable((subscribe) => {
          subscribe.next({
            name: 'Board 1',
            stages: [
              {
                id: 1,
                name: 'stage 1',
                boardId: 1,
              },
              {
                id: 2,
                name: 'stage 2',
                boardId: 1,
              },
            ],
          });
          subscribe.complete();
        });
      });
    });

    test('Then get task board and tasks with success', (done) => {
      service.getTaskBoardAndTasks(1).subscribe(() => {
        expect(findTaskBoardByIdUseCase.execute).toHaveBeenCalled();
        expect(findTaskBoardByIdUseCase.execute).toHaveBeenCalledWith(1);

        expect(
          findTasksByBoardIdAndBoardStageIdUseCase.execute,
        ).toHaveBeenCalledTimes(2);

        expect(
          findTasksByBoardIdAndBoardStageIdUseCase.execute,
        ).toHaveBeenNthCalledWith(1, {
          boardId: 1,
          boardStageId: 1,
        });

        expect(
          findTasksByBoardIdAndBoardStageIdUseCase.execute,
        ).toHaveBeenNthCalledWith(2, {
          boardId: 1,
          boardStageId: 2,
        });

        done();
      });
    });

    describe('And board stage not found task', () => {
      beforeEach(() => {
        jest
          .spyOn(findTasksByBoardIdAndBoardStageIdUseCase, 'execute')
          .mockImplementation((params) => {
            return new Observable((subscribe) => {
              const errorMock = new NotFoundException('Task not found');

              if (params.boardStageId === 1) {
                subscribe.error(errorMock);
              } else {
                subscribe.next([
                  {
                    title: 'Task 1',
                    description: 'Description task 1',
                    boardId: 1,
                    boardStageId: 1,
                    user: {
                      id: 1,
                    },
                  },
                ]);
              }

              subscribe.complete();
            });
          });
      });

      test('Then get task board and tasks with success', (done) => {
        service.getTaskBoardAndTasks(1).subscribe(() => {
          expect(findTaskBoardByIdUseCase.execute).toHaveBeenCalled();
          expect(findTaskBoardByIdUseCase.execute).toHaveBeenCalledWith(1);

          expect(
            findTasksByBoardIdAndBoardStageIdUseCase.execute,
          ).toHaveBeenCalledTimes(2);

          expect(
            findTasksByBoardIdAndBoardStageIdUseCase.execute,
          ).toHaveBeenNthCalledWith(1, {
            boardId: 1,
            boardStageId: 1,
          });

          expect(
            findTasksByBoardIdAndBoardStageIdUseCase.execute,
          ).toHaveBeenNthCalledWith(2, {
            boardId: 1,
            boardStageId: 2,
          });

          done();
        });
      });
    });
  });
});
