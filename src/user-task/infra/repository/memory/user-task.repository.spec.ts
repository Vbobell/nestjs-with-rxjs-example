import { Test, TestingModule } from '@nestjs/testing';

import { UserTaskRepositoryMemory } from '@app/user-task/infra/repository/memory/user-task.repository';

describe('UserTaskRepositoryMemory', () => {
  let service: UserTaskRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskRepositoryMemory],
    }).compile();

    service = module.get<UserTaskRepositoryMemory>(UserTaskRepositoryMemory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
