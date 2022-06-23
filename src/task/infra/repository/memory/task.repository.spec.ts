import { Test, TestingModule } from '@nestjs/testing';

import { TaskRepositoryMemory } from '@app/task/infra/repository/memory/task.repository';

describe('TaskRepositoryMemory', () => {
  let repository: TaskRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepositoryMemory],
    }).compile();

    repository = module.get<TaskRepositoryMemory>(TaskRepositoryMemory);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('When list all tasks', () => {
    test('Then get list with success', (done) => {
      repository.getTasks().subscribe((result) => {
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
            },
          },
          {
            title: 'Task 4',
            description: 'Description task 4',
            user: {
              id: 2,
            },
          },
        ]);

        done();
      });
    });
  });
});
