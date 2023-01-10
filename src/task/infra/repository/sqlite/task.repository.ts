import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { loggerOperator } from '@app/common/infra/utils/logger-operator';
import { TaskEntitySqlite } from '@app/task/infra/repository/sqlite/entity/task.entity';

@Injectable()
export class TaskRepositorySqlite implements TaskRepository<TaskEntitySqlite> {
  private readonly logger = new Logger(TaskRepositorySqlite.name);

  constructor(
    @InjectRepository(TaskEntitySqlite)
    private readonly repository: Repository<TaskEntitySqlite>,
  ) {}

  getTasks(): Observable<Task[]> {
    return from(this.repository.find()).pipe(
      map((taskEntities: TaskEntitySqlite[]) =>
        this.mapEntitiesToDomain(taskEntities),
      ),
      loggerOperator(this.logger, {
        initLog: {
          message: 'getTasks | execution started',
        },
        endLog: {
          message: 'getTasks | finished execution',
        },
        errorLog: {
          message: 'getTasks | execution with error',
        },
      }),
    );
  }

  getTask(id: number): Observable<Task> {
    return from(this.repository.findOneBy({ id })).pipe(
      map((taskEntity: TaskEntitySqlite) => {
        if (!taskEntity) {
          throw new NotFoundException('Task not found');
        }

        return this.mapEntityToDomain(taskEntity);
      }),
      loggerOperator(this.logger, {
        initLog: {
          message: 'getTask | execution started',
        },
        endLog: {
          message: 'getTask | finished execution',
        },
        errorLog: {
          message: 'getTask | execution with error',
        },
      }),
    );
  }

  getTaskByBoardIdAndBoardStageId(
    params: Pick<Task, 'boardId' | 'boardStageId'>,
  ): Observable<Task> {
    return from(this.repository.findOneBy({ ...params })).pipe(
      map((taskEntity: TaskEntitySqlite) => {
        if (!taskEntity) {
          throw new NotFoundException('Task not found');
        }

        return this.mapEntityToDomain(taskEntity);
      }),
      loggerOperator(this.logger, {
        initLog: {
          message: 'getTaskByBoardIdAndBoardStageId | execution started',
        },
        endLog: {
          message: 'getTaskByBoardIdAndBoardStageId | finished execution',
        },
        errorLog: {
          message: 'getTaskByBoardIdAndBoardStageId | execution with error',
        },
      }),
    );
  }

  mapEntityToDomain(taskEntityMemory: TaskEntitySqlite): Task {
    const task: Task = {
      title: taskEntityMemory.title,
      description: taskEntityMemory.description,
      ...(taskEntityMemory.boardId && { boardId: taskEntityMemory.boardId }),
      ...(taskEntityMemory.boardStageId && {
        boardStageId: taskEntityMemory.boardStageId,
      }),
      ...(taskEntityMemory.user && { user: taskEntityMemory.user }),
    };

    return task;
  }

  mapEntitiesToDomain(taskEntities: TaskEntitySqlite[]): Task[] {
    return taskEntities.map((taskEntity) => this.mapEntityToDomain(taskEntity));
  }
}
