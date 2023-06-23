import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { TaskBoardStagesResponseDTO } from '@app/task-board/domain/dto/task-board-stage-response.dto';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

export class TaskBoardResponseDTO implements Pick<TaskBoard, 'name'> {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: [TaskBoardStagesResponseDTO] })
  stages: TaskBoardStagesResponseDTO[];

  constructor(params: Partial<TaskBoardResponseDTO>) {
    this.name = params.name;
    this.stages = params.stages;
  }
}
