import { Module } from '@nestjs/common';

import { TaskModule } from '@app/task/task.module';
import { UserTaskModule } from '@app/user-task/user-task.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule, TaskModule, UserTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
