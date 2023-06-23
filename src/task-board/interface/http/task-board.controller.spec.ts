import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { TaskBoardResponseDTO } from '@app/task-board/domain/dto/task-board-response.dto';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

import { TaskBoardService } from '@app/task-board/application/services/task-board/task-board.service';

import { TaskBoardController } from '@app/task-board/interface/http/task-board.controller';

import { createTestingModule } from '@test/util/test.module';

describe('TaskBoardController', () => {
  let taskBoardService: TaskBoardService;
  let controller: TaskBoardController;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: TaskBoardService,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getTaskBoardAndTasks: jest.fn(),
            };
          }),
        },
      ],
      controllers: [TaskBoardController],
    }).compile();

    taskBoardService = module.get<TaskBoardService>(TaskBoardService);
    controller = module.get<TaskBoardController>(TaskBoardController);
  });

  it('should be defined', () => {
    expect(taskBoardService).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('When get board with stages and tasks', () => {
    let taskBoard: TaskBoard;
    let taskBoardDTO: TaskBoardResponseDTO;

    beforeEach(() => {
      taskBoard = {
        name: 'Fake board',
        stages: [
          {
            boardId: 1,
            name: 'fake board name',
            description: 'fake board description',
            id: 1,
            tasks: [
              {
                title: 'Fake task 1',
                description: 'Fake description task 1',
                boardId: 1,
                boardStageId: 1,
                user: {
                  id: 1,
                },
              },
            ],
          },
          {
            boardId: 1,
            name: 'fake board name 2',
            description: 'fake board description 2',
            id: 2,
            tasks: [
              {
                title: 'Fake task 2',
                description: 'Fake description task 2',
                boardId: 1,
                boardStageId: 2,
                user: {
                  id: 1,
                },
              },
            ],
          },
        ],
      };

      taskBoardDTO = {
        name: 'Fake board',
        stages: [
          {
            id: 1,
            name: 'fake board name',
            description: 'fake board description',
            tasks: [
              {
                title: 'Fake task 1',
                description: 'Fake description task 1',
                boardId: 1,
                boardStageId: 1,
                user: { id: 1 },
              },
            ],
          },
          {
            id: 2,
            name: 'fake board name 2',
            description: 'fake board description 2',
            tasks: [
              {
                title: 'Fake task 2',
                description: 'Fake description task 2',
                boardId: 1,
                boardStageId: 2,
                user: { id: 1 },
              },
            ],
          },
        ],
      };
    });

    test('Then execute with success', (done) => {
      jest
        .spyOn(taskBoardService, 'getTaskBoardAndTasks')
        .mockImplementation(() => {
          return new Observable((subscribe) => {
            subscribe.next(taskBoard);
            subscribe.complete();
          });
        });

      controller
        .findBoardAndTasksByBoardId(1)
        .subscribe((result: TaskBoardResponseDTO) => {
          expect(taskBoardService.getTaskBoardAndTasks).toHaveBeenCalled();
          expect(taskBoardService.getTaskBoardAndTasks).toHaveBeenCalledWith(1);

          expect(result).toEqual(taskBoardDTO);

          done();
        });
    });
  });
});
