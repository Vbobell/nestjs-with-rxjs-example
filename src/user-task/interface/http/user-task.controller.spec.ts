import { TestingModule } from '@nestjs/testing';

import { UserTaskRepository } from '@app/user-task/domain/abstract/user-task.repository';
import { UserRepository } from '@app/user/domain/abstract/user.repository';

import { FindUserTasksUseCase } from '@app/user-task/application/find-user-tasks/find-user-tasks.use-case';
import { CheckExistUserUseCase } from '@app/user/application/check-exist-user/check-exist-user.use-case';

import { UserTaskController } from '@app/user-task/interface/http/user-task.controller';

import { createTestingModule } from '@test/util/test.module';

describe('UserTaskController', () => {
  let controller: UserTaskController;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      controllers: [UserTaskController],
      providers: [
        {
          provide: UserTaskRepository,
          useClass: jest.fn(),
        },
        {
          provide: UserRepository,
          useClass: jest.fn(),
        },
        FindUserTasksUseCase,
        CheckExistUserUseCase,
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(jest.fn())
      .compile();

    controller = module.get<UserTaskController>(UserTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
