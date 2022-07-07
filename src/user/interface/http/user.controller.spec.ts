import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';
import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

import { UserController } from '@app/user/interface/http/user.controller';

describe('UserController', () => {
  let controller: UserController;
  let listUserUseCase: ListUserUseCase;
  let findUserByIdUseCase: FindUserByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: ListUserUseCase,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              execute: jest.fn(),
            };
          }),
        },
        {
          provide: FindUserByIdUseCase,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              execute: jest.fn(),
            };
          }),
        },
        {
          provide: UserRepository,
          useFactory: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    listUserUseCase = module.get<ListUserUseCase>(ListUserUseCase);
    findUserByIdUseCase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(listUserUseCase).toBeDefined();
    expect(findUserByIdUseCase).toBeDefined();
  });

  describe('When get list of users', () => {
    let users: User[];

    beforeEach(() => {
      users = [
        {
          id: 1,
          name: 'Joana',
        },
        {
          id: 2,
          name: 'Jhon',
        },
      ];
    });

    test('Then get list users with success', (done) => {
      jest.spyOn(listUserUseCase, 'execute').mockReturnValue(
        new Observable<User[]>((subscribe) => {
          subscribe.next(users);
          subscribe.complete();
        }),
      );

      controller.listUsers().subscribe((result) => {
        expect(result).toEqual(users);
        done();
      });
    });

    test('Then get empty list users', (done) => {
      jest.spyOn(listUserUseCase, 'execute').mockReturnValue(
        new Observable<User[]>((subscribe) => {
          subscribe.next([]);
          subscribe.complete();
        }),
      );

      controller.listUsers().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('When find user by id', () => {
    let user: User;

    beforeEach(() => {
      user = {
        id: 1,
        name: 'Joana',
      };
    });

    test('Then find user with success', (done) => {
      jest.spyOn(findUserByIdUseCase, 'execute').mockReturnValue(
        new Observable<User>((subscribe) => {
          subscribe.next(user);
          subscribe.complete();
        }),
      );

      controller.findUserById(1).subscribe((result) => {
        expect(result).toEqual(user);
        done();
      });
    });

    test('Then user not found', (done) => {
      jest.spyOn(findUserByIdUseCase, 'execute').mockReturnValue(
        new Observable<User>((subscribe) => {
          subscribe.next(undefined);
          subscribe.complete();
        }),
      );

      controller.findUserById(2).subscribe((result) => {
        expect(result).toEqual(undefined);
        done();
      });
    });
  });
});
