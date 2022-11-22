import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { CheckExistUserUseCase } from '@app/user/application/check-exist-user/check-exist-user.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('CheckExistUserUseCase', () => {
  let useCase: CheckExistUserUseCase;
  let repository: UserRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        CheckExistUserUseCase,
        {
          provide: UserRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              checkExistUserById: jest.fn(),
            };
          }),
        },
      ],
    }).compile();

    useCase = module.get<CheckExistUserUseCase>(CheckExistUserUseCase);
    repository = module.get<UserRepository<unknown>>(UserRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When check exist user', () => {
    test('Then user exist', (done) => {
      jest.spyOn(repository, 'checkExistUserById').mockReturnValue(
        new Observable<boolean>((subscribe) => {
          subscribe.next(true);
          subscribe.complete();
        }),
      );

      useCase.execute(1).subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });

    test("Then user d'ont exist", (done) => {
      jest.spyOn(repository, 'checkExistUserById').mockReturnValue(
        new Observable<boolean>((subscribe) => {
          subscribe.next(false);
          subscribe.complete();
        }),
      );

      useCase.execute(2).subscribe((result) => {
        expect(result).toEqual(false);
        done();
      });
    });
  });
});
