import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/common/database.module';
import { TaskBoardModule } from '@app/task-board/task-board.module';
import { TaskModule } from '@app/task/task.module';
import { UserTaskModule } from '@app/user-task/user-task.module';
import { UserModule } from '@app/user/user.module';
@Module({
  imports: [
    UserModule,
    TaskModule,
    UserTaskModule,
    DatabaseModule,
    TaskBoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
