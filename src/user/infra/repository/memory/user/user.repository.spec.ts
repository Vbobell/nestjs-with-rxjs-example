import { Test, TestingModule } from '@nestjs/testing';

import { UserRepositoryMemory } from '@/app/user/infra/repository/memory/user/user.repository';

describe('UserRepositoryMemory', () => {
  let service: UserRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryMemory],
    }).compile();

    service = module.get<UserRepositoryMemory>(UserRepositoryMemory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When list all users', () => {
    test('Then get list with success', (done) => {
      service.getUsers().subscribe((result) => {
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
