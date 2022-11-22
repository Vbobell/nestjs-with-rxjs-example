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
            user: {
              id: 1,
              name: 'John',
            },
          },
          {
            title: 'Task 4',
            description: 'Description task 4',
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
});
