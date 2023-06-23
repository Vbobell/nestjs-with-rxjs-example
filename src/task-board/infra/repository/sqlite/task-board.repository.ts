import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { NotFoundException } from '@app/common/domain/interface/not-found.exception';
import { TaskBoardRepository } from '@app/task-board/domain/abstract/task-board.repository';
import { TaskBoardStage } from '@app/task-board/domain/interface/task-board-stage.interface';
import { TaskBoard } from '@app/task-board/domain/interface/task-board.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';
import { TaskBoardStageEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board-stage.entity';
import { TaskBoardEntitySqlite } from '@app/task-board/infra/repository/sqlite/entity/task-board.entity';

@Injectable()
export class TaskBoardRepositorySqlite
  implements TaskBoardRepository<TaskBoardEntitySqlite>
{
  private readonly logger = new Logger(TaskBoardRepositorySqlite.name);

  constructor(
    @InjectRepository(TaskBoardEntitySqlite)
    private readonly repository: Repository<TaskBoardEntitySqlite>,
  ) {}

  getTaskBoards(): Observable<TaskBoard[]> {
    return from(this.repository.find()).pipe(
      map((taskBoardEntities: TaskBoardEntitySqlite[]) =>
        this.mapEntitiesToDomain(taskBoardEntities),
      ),
      loggerOperator(this.logger, {
        initLog: {
          message: 'getTaskBoards | execution started',
        },
        endLog: {
          message: 'getTaskBoards | finished execution',
        },
        errorLog: {
          message: 'getTaskBoards | execution with error',
        },
      }),
    );
  }

  getTaskBoardById(id: number): Observable<TaskBoard> {
    return from(
      this.repository.findOne({ where: { id }, relations: ['stages'] }),
    ).pipe(
      map((taskBoardEntity: TaskBoardEntitySqlite) => {
        if (!taskBoardEntity) {
          throw new NotFoundException('Task board not found');
        }

        return this.mapEntityToDomain(taskBoardEntity);
      }),
      loggerOperator(this.logger, {
        initLog: {
          message: 'getTaskBoard | execution started',
        },
        endLog: {
          message: 'getTaskBoard | finished execution',
        },
        errorLog: {
          message: 'getTaskBoard | execution with error',
        },
      }),
    );
  }

  mapEntityToDomain(entity: TaskBoardEntitySqlite): TaskBoard {
    const stages =
      entity?.stages?.map<TaskBoardStage>(
        (stage: TaskBoardStageEntitySqlite) => {
          return {
            id: stage.id,
            boardId: entity.id,
            name: stage.name,
          };
        },
      ) || [];

    return {
      name: entity.name,
      stages,
    };
  }

  mapEntitiesToDomain(entities: TaskBoardEntitySqlite[]): TaskBoard[] {
    return entities.map((entity: TaskBoardEntitySqlite) =>
      this.mapEntityToDomain(entity),
    );
  }
}
