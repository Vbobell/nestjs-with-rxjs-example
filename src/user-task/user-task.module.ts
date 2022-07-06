import { Module } from '@nestjs/common';

import { UserTaskRepositoryMemory } from '@app/user-task/infra/repository/memory/user-task.repository';

@Module({
  providers: [UserTaskRepositoryMemory],
})
export class UserTaskModule {}
