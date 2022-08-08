import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { UserRepository } from '@app/user/domain/abstract/user.repository';
import { User } from '@app/user/domain/interface/user.interface';

import { FindUserByIdUseCase } from '@app/user/application/find-user-by-id/find-user-by-id.use-case';

describe('ListUserUseCase', () => {
  let useCase: FindUserByIdUseCase;
  let repository: UserRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUseCase,
        {
          provide: UserRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getUserById: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    useCase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase);
    repository = module.get<UserRepository<unknown>>(UserRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get user', () => {
    let user: User;

    beforeEach(() => {
      user = {
        id: 1,
        name: 'Joana',
      };
    });

    test('Then find user with success', (done) => {
      jest.spyOn(repository, 'getUserById').mockReturnValue(
        new Observable<User>((subscribe) => {
          subscribe.next(user);
          subscribe.complete();
        }),
      );

      useCase.execute(1).subscribe((result) => {
        expect(result).toEqual(user);
        done();
      });
    });

    test('Then user not found', (done) => {
      jest.spyOn(repository, 'getUserById').mockReturnValue(
        new Observable<User>((subscribe) => {
          subscribe.error(new NotFoundException('User not found'));
          subscribe.complete();
        }),
      );

      useCase.execute(2).subscribe({
        error: (error: NotFoundException) => {
          expect(error.message).toEqual('User not found');
          done();
        },
      });
    });
  });
});
