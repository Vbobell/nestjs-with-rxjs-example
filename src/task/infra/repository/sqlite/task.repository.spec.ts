import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';
import { TaskRepositorySqlite } from '@app/task/infra/repository/sqlite/task.repository';

import { createTestingModule } from '@test/util/test.module';

describe('TaskRepositorySqlite', () => {
  let repository: Repository<TaskEntitySqlite>;
  let repositoryImpl: TaskRepositorySqlite;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        TaskRepositorySqlite,
        {
          provide: 'TaskEntitySqliteRepository',
          useFactory: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn(),
              findOneBy: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    repository = module.get<Repository<TaskEntitySqlite>>(
      'TaskEntitySqliteRepository',
    );
    repositoryImpl = module.get<TaskRepositorySqlite>(TaskRepositorySqlite);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(repositoryImpl).toBeDefined();
  });

  describe('When list all tasks', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'find').mockResolvedValue([
        {
          id: 1,
          title: 'Task 1',
          description: 'Description task 1',
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description task 2',
          createdAt: new Date(),
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'Description task 3',
          createdAt: new Date(),
          boardId: 1,
          user: {
            id: 1,
            name: 'John',
          },
        },
        {
          id: 4,
          title: 'Task 4',
          description: 'Description task 4',
          createdAt: new Date(),
          boardId: 1,
          user: {
            id: 2,
            name: 'Joana',
          },
        },
      ]);
    });

    test('Then get list with success', (done) => {
      repositoryImpl.getTasks().subscribe((result) => {
        expect(result).toEqual([
          {
            title: 'Task 1',
            description: 'Description task 1',
          },
          {
            title: 'Task 2',
            description: 'Description task 2',
          },
          {
            title: 'Task 3',
            description: 'Description task 3',
            boardId: 1,
            user: {
              id: 1,
              name: 'John',
            },
          },
          {
            title: 'Task 4',
            description: 'Description task 4',
            boardId: 1,
            user: {
              id: 2,
              name: 'Joana',
            },
          },
        ]);

        done();
      });
    });
  });

  describe('When find task', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({
        id: 1,
        title: 'Task 1',
        description: 'Description task 1',
        boardId: 1,
        createdAt: new Date(),
        user: {
          id: 1,
          name: 'John',
        },
      });
    });

    test('Then get task with success', (done) => {
      repositoryImpl.getTask(1).subscribe((result) => {
        expect(repository.findOneBy).toHaveBeenCalled();
        expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });

        expect(result).toEqual({
          title: 'Task 1',
          description: 'Description task 1',
          boardId: 1,
          user: {
            id: 1,
            name: 'John',
          },
        });

        done();
      });
    });

    describe('And task not found', () => {
      beforeEach(() => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      });

      test('Then user not found', (done) => {
        repositoryImpl.getTask(3).subscribe({
          error: (error) => {
            expect(repository.findOneBy).toHaveBeenCalled();
            expect(repository.findOneBy).toHaveBeenCalledWith({ id: 3 });

            expect(error.message).toEqual('Task not found');

            done();
          },
        });
      });
    });
  });

  describe('When find task by board id and board stage id', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({
        id: 1,
        title: 'Task 1',
        description: 'Description task 1',
        boardId: 1,
        boardStageId: 1,
        createdAt: new Date(),
        user: {
          id: 1,
          name: 'John',
        },
      });
    });

    test('Then get task with success', (done) => {
      repositoryImpl
        .getTaskByBoardIdAndBoardStageId({ boardId: 1, boardStageId: 1 })
        .subscribe((result) => {
          expect(repository.findOneBy).toHaveBeenCalled();
          expect(repository.findOneBy).toHaveBeenCalledWith({
            boardId: 1,
            boardStageId: 1,
          });

          expect(result).toEqual({
            title: 'Task 1',
            description: 'Description task 1',
            boardId: 1,
            boardStageId: 1,
            user: {
              id: 1,
              name: 'John',
            },
          });

          done();
        });
    });

    describe('And task not found', () => {
      beforeEach(() => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      });

      test('Then user not found', (done) => {
        repositoryImpl
          .getTaskByBoardIdAndBoardStageId({ boardId: 3, boardStageId: 3 })
          .subscribe({
            error: (error) => {
              expect(repository.findOneBy).toHaveBeenCalled();
              expect(repository.findOneBy).toHaveBeenCalledWith({
                boardId: 3,
                boardStageId: 3,
              });

              expect(error.message).toEqual('Task not found');

              done();
            },
          });
      });
    });
  });
});
