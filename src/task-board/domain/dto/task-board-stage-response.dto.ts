import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { TaskBoardStage } from '@app/task-board/domain/interface/task-board-stage.interface';
import { Task } from '@app/task/domain/interface/task.interface';

export class TaskBoardStagesResponseDTO
  implements Pick<TaskBoardStage, 'id' | 'name' | 'description' | 'tasks'>
{
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  tasks?: Task[];

  constructor(params: Partial<TaskBoardStagesResponseDTO>) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.tasks = params.tasks;
  }
}
