import { TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';

import { TaskRepository } from '@app/task/domain/abstract/task.repository';
import { Task } from '@app/task/domain/interface/task.interface';

import { ListTaskUseCase } from '@app/task/application/list-task/list-task.use-case';

import { createTestingModule } from '@test/util/test.module';

describe('ListTaskUseCase', () => {
  let useCase: ListTaskUseCase;
  let repository: TaskRepository<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      providers: [
        {
          provide: TaskRepository,
          useFactory: jest.fn().mockImplementation(() => {
            return {
              getTasks: jest.fn(),
            };
          }),
        },
        ListTaskUseCase,
      ],
    }).compile();

    useCase = module.get<ListTaskUseCase>(ListTaskUseCase);
    repository = module.get<TaskRepository<unknown>>(TaskRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('When get list tasks', () => {
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
      jest.spyOn(repository, 'getTasks').mockReturnValue(
        new Observable<Task[]>((subscribe) => {
          subscribe.next(tasks);
          subscribe.complete();
        }),
      );

      useCase.execute().subscribe((result) => {
        expect(result).toEqual(tasks);
        done();
      });
    });

    test('Then get empty list tasks', (done) => {
      jest.spyOn(repository, 'getTasks').mockReturnValue(
        new Observable<Task[]>((subscribe) => {
          subscribe.next([]);
          subscribe.complete();
        }),
      );

      useCase.execute().subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });
});
