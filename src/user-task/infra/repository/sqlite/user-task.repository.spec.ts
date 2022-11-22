import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';
import { UserTaskRepositorySqlite } from '@app/user-task/infra/repository/sqlite/user-task.repository';

import { createTestingModule } from '@test/util/test.module';

describe('UserTaskRepositorySqlite', () => {
  let repository: Repository<TaskEntitySqlite>;
  let repositoryImpl: UserTaskRepositorySqlite;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        UserTaskRepositorySqlite,
        {
          provide: 'TaskEntitySqliteRepository',
          useFactory: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    repository = module.get<Repository<TaskEntitySqlite>>(
      'TaskEntitySqliteRepository',
    );
    repositoryImpl = module.get<UserTaskRepositorySqlite>(
      UserTaskRepositorySqlite,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(repositoryImpl).toBeDefined();
  });

  describe('When get user task list', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'find').mockResolvedValue([
        {
          id: 1,
          title: 'Task 1',
          description: 'Description task 1',
          createdAt: new Date(),
          user: {
            id: 1,
            name: 'John',
          },
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description task 2',
          createdAt: new Date(),
          user: {
            id: 1,
            name: 'John',
          },
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'Description task 3',
          createdAt: new Date(),
          user: {
            id: 1,
            name: 'John',
          },
        },
      ]);
    });

    test('Then get list with success', (done) => {
      repositoryImpl.getUserTasksById(1).subscribe((result) => {
        expect(result).toEqual({
          tasks: [
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
            },
          ],
          user: {
            id: 1,
            name: 'John',
          },
        });

        done();
      });
    });

    test('Then get empty list', (done) => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      repositoryImpl.getUserTasksById(3).subscribe((result) => {
        expect(result).toEqual({
          tasks: [],
          user: {
            id: 3,
          },
        });

        done();
      });
    });
  });
});
