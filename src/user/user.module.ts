import { Module } from '@nestjs/common';

import { UserRepository } from '@/app/user/domain/user/abstract/user.repository';
import { UserRepositoryMemory } from '@/app/user/infra/repository/memory/user/user.repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
  ],
})
export class UserModule {}
