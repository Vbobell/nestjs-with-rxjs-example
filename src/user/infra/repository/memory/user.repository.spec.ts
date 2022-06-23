import { Test, TestingModule } from '@nestjs/testing';

import { UserRepositoryMemory } from '@app/user/infra/repository/memory/user.repository';

describe('UserRepositoryMemory', () => {
  let repository: UserRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryMemory],
    }).compile();

    repository = module.get<UserRepositoryMemory>(UserRepositoryMemory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('When list all users', () => {
    test('Then get list with success', (done) => {
      repository.getUsers().subscribe((result) => {
        expect(result).toEqual([
          {
            id: 1,
            name: 'Joana',
          },
          {
            id: 2,
            name: 'Jhon',
          },
        ]);

        done();
      });
    });
  });
});
