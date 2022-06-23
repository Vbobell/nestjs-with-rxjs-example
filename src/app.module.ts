import { Module } from '@nestjs/common';

import { TaskModule } from '@app/task/task.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
