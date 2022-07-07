import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { Task } from '@app/task/domain/interface/task.interface';
import { User } from '@app/user/domain/interface/user.interface';

type UserTaskParams = Pick<User, 'id'>;
type TaskParams = Pick<Task, 'description' | 'title' | 'user'>;

class UserTaskResponseDTO implements UserTaskParams {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class TaskResponseDTO implements TaskParams {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  user?: UserTaskResponseDTO;
}
