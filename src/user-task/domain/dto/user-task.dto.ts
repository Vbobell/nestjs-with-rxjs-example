import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Task } from '@app/task/domain/interface/task.interface';
import { UserTask } from '@app/user-task/domain/interface/user-task.interface';
import { User } from '@app/user/domain/interface/user.interface';

export class UserTasksResponseDTO implements Pick<UserTask, 'user' | 'tasks'> {
  @IsNotEmpty()
  @ApiProperty()
  user: Pick<User, 'id'>;

  @IsNotEmpty()
  @ApiProperty()
  tasks: Pick<Task, 'description' | 'title'>[];
}
