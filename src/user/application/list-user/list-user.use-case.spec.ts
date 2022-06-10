import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

describe('ListUserUseCase', () => {
  let useCase: ListUserUseCase;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUserUseCase,
        {
          provide: UserRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getUsers: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    useCase = module.get<ListUserUseCase>(ListUserUseCase);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get list users', () => {
    let users: User[];

    beforeEach(() => {
      users = [
        {
          name: 'Joana',
        },
        {
          name: 'Jhon',
        },
      ];
    });

    test('Then get list users with success', (done) => {
      jest.spyOn(repository, 'getUsers').mockReturnValue(
        new Observable<User[]>((subscribe) => {
          subscribe.next(users);
          subscribe.complete();
        }),
      );

      useCase.execute().subscribe((result) => {
        expect(result).toEqual(users);
        done();
      });
    });

    test('Then get empty list users', (done) => {
      jest.spyOn(repository, 'getUsers').mockReturnValue(
        new Observable<User[]>((subscribe) => {
          subscribe.next([]);
          subscribe.complete();
        }),
      );

      useCase.execute().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });
});
