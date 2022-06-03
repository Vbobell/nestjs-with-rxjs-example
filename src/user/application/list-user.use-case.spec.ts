import { Observable } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@/app/user/domain/user/interface/user.interface';
import { UserRepository } from '@/app/user/domain/user/abstract/user.repository';
import { ListUserUseCase } from '@/app/user/application/list-user.use-case';

describe('ListUserUseCase', () => {
  let service: ListUserUseCase;
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

    service = module.get<ListUserUseCase>(ListUserUseCase);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      service.execute().subscribe((result) => {
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

      service.execute().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });
});
