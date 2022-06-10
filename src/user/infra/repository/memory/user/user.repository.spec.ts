import { Test, TestingModule } from '@nestjs/testing';

import { UserRepositoryMemory } from '@app/user/infra/repository/memory/user/user.repository';

describe('UserRepositoryMemory', () => {
  let useCase: UserRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryMemory],
    }).compile();

    useCase = module.get<UserRepositoryMemory>(UserRepositoryMemory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('When list all users', () => {
    test('Then get list with success', (done) => {
      useCase.getUsers().subscribe((result) => {
        expect(result).toEqual([
          {
            name: 'Joana',
          },
          {
            name: 'Jhon',
          },
        ]);

        done();
      });
    });
  });
});
