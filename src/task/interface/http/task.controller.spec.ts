import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

import { TaskController } from '@app/task/interface/http/task.controller';

import { createTestingModule } from '@test/util/test.module';

describe('TaskController', () => {
  let controller: TaskController;
  let listTaskUseCase: ListTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: ListTaskUseCase,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              execute: jest.fn(),
            };
          }),
        },
        {
          provide: TaskRepository,
          useFactory: jest.fn(),
        },
      ],
      controllers: [TaskController],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    listTaskUseCase = module.get<ListTaskUseCase>(ListTaskUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(listTaskUseCase).toBeDefined();
  });

  describe('When get list of tasks', () => {
    let tasks: Task[];

    beforeEach(() => {
      tasks = [
        {
          title: 'Task 1',
          description: 'Description task 1',
        },
        {
          title: 'Task 2',
          description: 'Description task 2',
        },
        {
          title: 'Task 2',
          description: 'Description task 2',
          user: {
            id: 1,
          },
        },
      ];
    });

    test('Then get list tasks with success', (done) => {
      jest.spyOn(listTaskUseCase, 'execute').mockReturnValue(
        new Observable<Task[]>((subscribe) => {
          subscribe.next(tasks);
          subscribe.complete();
        }),
      );

      controller.listTasks().subscribe((result) => {
        expect(result).toEqual(tasks);
        done();
      });
    });

    test('Then get empty list tasks', (done) => {
      jest.spyOn(listTaskUseCase, 'execute').mockReturnValue(
        new Observable<Task[]>((subscribe) => {
          subscribe.next([]);
          subscribe.complete();
        }),
      );

      controller.listTasks().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });
});
