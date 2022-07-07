import { Test, TestingModule } from '@nestjs/testing';

import { UserTaskRepositoryMemory } from '@app/user-task/infra/repository/memory/user-task.repository';

describe('UserTaskRepositoryMemory', () => {
  let repository: UserTaskRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskRepositoryMemory],
    }).compile();

    repository = module.get<UserTaskRepositoryMemory>(UserTaskRepositoryMemory);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('When get user task list', () => {
    test('Then get list with success', (done) => {
      repository.getUserTasks(1).subscribe((result) => {
        expect(result).toEqual({
          tasks: [
            {
              title: 'Task 3',
              description: 'Description task 3',
            },
          ],
          user: {
            id: 1,
          },
        });

        done();
      });
    });

    test('Then get empty list', (done) => {
      repository.getUserTasks(3).subscribe((result) => {
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
