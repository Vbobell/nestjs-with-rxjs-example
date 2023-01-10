import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Repository } from '@app/common/domain/abstract/abstract.repository';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

@Injectable()
export abstract class TaskBoardRepository<T> extends Repository<T, TaskBoard> {
  abstract getTaskBoards(): Observable<TaskBoard[]>;
  abstract getTaskBoardById(id: number): Observable<TaskBoard>;
}
