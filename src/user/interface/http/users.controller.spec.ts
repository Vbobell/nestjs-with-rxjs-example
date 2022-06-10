import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { ListUserUseCase } from '@app/user/application/list-user/list-user.use-case';

import { UserController } from '@app/user/interface/http/users.controller';

describe('UserController', () => {
  let controller: UserController;
  let useCase: ListUserUseCase;

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
          provide: UserRepository,
          useFactory: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    useCase = module.get<ListUserUseCase>(ListUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
  });
});
