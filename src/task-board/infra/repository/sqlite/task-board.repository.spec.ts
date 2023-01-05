import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';
import { TaskBoardRepositorySqlite } from '@app/task-board/infra/repository/sqlite/task-board.repository';

import { createTestingModule } from '@test/util/test.module';

describe('TaskBoardRepositorySqlite', () => {
  let repositoryTaskBoard: Repository<TaskBoardEntitySqlite>;
  let repositoryImpl: TaskBoardRepositorySqlite;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        TaskBoardRepositorySqlite,
        {
          provide: 'TaskBoardEntitySqliteRepository',
          useFactory: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    repositoryTaskBoard = module.get<Repository<TaskBoardEntitySqlite>>(
      'TaskBoardEntitySqliteRepository',
    );

    repositoryImpl = module.get<TaskBoardRepositorySqlite>(
      TaskBoardRepositorySqlite,
    );
  });

  it('should be defined', () => {
    expect(repositoryTaskBoard).toBeDefined();
    expect(repositoryImpl).toBeDefined();
  });

  describe('When list all tasks', () => {
    beforeEach(() => {
      jest.spyOn(repositoryTaskBoard, 'find').mockResolvedValue([
        {
          id: 1,
          name: 'Board 1',
          description: 'Description task 1',
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Board 2',
          description: 'Description board 2',
          createdAt: new Date(),
          stages: [
            {
              id: 1,
              name: 'stage 1',
              board: {
                id: 2,
                name: 'Board 2',
                description: 'Description board 2',
                createdAt: new Date(),
              },
            },
          ],
        },
      ]);
    });

    test('Then get list with success', (done) => {
      repositoryImpl.getTaskBoards().subscribe((result) => {
        expect(result).toEqual([
          {
            name: 'Board 1',
            stages: [],
          },
          {
            name: 'Board 2',
            stages: [
              {
                name: 'stage 1',
                boardId: 2,
              },
            ],
          },
        ]);

        done();
      });
    });
  });
});
