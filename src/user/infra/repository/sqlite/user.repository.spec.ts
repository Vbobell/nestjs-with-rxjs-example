import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { UserEntitySqlite } from '@app/user/infra/repository/sqlite/entity/user.entity';
import { UserRepositorySqlite } from '@app/user/infra/repository/sqlite/user.repository';

import { createTestingModule } from '@test/util/test.module';

describe('UserRepositorySqlite', () => {
  let repository: Repository<UserEntitySqlite>;
  let repositoryImpl: UserRepositorySqlite;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        UserRepositorySqlite,
        {
          provide: 'UserEntitySqliteRepository',
          useFactory: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn(),
              findOneBy: jest.fn(),
              countBy: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    repository = module.get<Repository<UserEntitySqlite>>(
      'UserEntitySqliteRepository',
    );
    repositoryImpl = module.get<UserRepositorySqlite>(UserRepositorySqlite);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(repositoryImpl).toBeDefined();
  });

  describe('When list all users', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'find').mockResolvedValue([
        {
          id: 1,
          name: 'Joana',
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Jhon',
          createdAt: new Date(),
        },
      ]);
    });

    test('Then get list with success', (done) => {
      repositoryImpl.getUsers().subscribe((result) => {
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

  describe('When get user by id', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({
        id: 1,
        name: 'Joana',
        createdAt: new Date(),
      });
    });

    test('Then get user with success', (done) => {
      repositoryImpl.getUserById(1).subscribe((result) => {
        expect(result).toEqual({
          id: 1,
          name: 'Joana',
        });

        done();
      });
    });

    test('Then user not found', (done) => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      repositoryImpl.getUserById(3).subscribe({
        error: (error) => {
          expect(error.message).toEqual('User not found');

          done();
        },
      });
    });
  });

  describe('When check exist user', () => {
    beforeEach(() => {
      jest.spyOn(repository, 'countBy').mockResolvedValue(1);
    });

    test('Then user exist', (done) => {
      repositoryImpl.checkExistUserById(1).subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });

    test("Then user d'ont exist", (done) => {
      jest.spyOn(repository, 'countBy').mockResolvedValue(0);

      repositoryImpl.checkExistUserById(3).subscribe((result) => {
        expect(result).toEqual(false);
        done();
      });
    });
  });
});
