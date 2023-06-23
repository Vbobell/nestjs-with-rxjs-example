## mergeMap()

Esse operador do `rxjs` manipula e combina uma stream de dados do `Observable` com outra stram de dados.

### Exemplo

O Exemplo abaixo manipula o `Observable` do tipo `TaskBoardStage` e incorpora na propriedade `tasks`,
as tarefas que pertencem aquele board.

```typescript
import { Observable, mergeMap, map } from 'rxjs';

interface User {
  id: number;
  name: string;
}

interface Task {
  title: string;
  description: string;
  user?: Pick<User, 'id'>;
  boardId?: number;
  boardStageId?: number;
}

interface TaskBoardStage {
  boardId: number;
  name: string;
  id?: number;
  description?: string;
  tasks?: Task[];
}

const tasksObservable: Observable<Task[]> = new Observable<Task[]>(
  (subscribe) => {
    const tasks: Task[] = [
      {
        title: 'Task 1',
        description: 'Description task 1',
        boardId: 1,
        boardStageId: 1,
      },
      {
        title: 'Task 2',
        description: 'Description task 2',
        boardId: 1,
        boardStageId: 2,
      },
      {
        title: 'Task 3',
        description: 'Description task 3',
        user: {
          id: 1,
        },
        boardId: 1,
        boardStageId: 1,
      },
    ];

    subscribe.next(tasks);
    subscribe.complete();
  },
);

const taskBoardStageObservable: Observable<TaskBoardStage> =
  new Observable<TaskBoardStage>((subscribe) => {
    const taskBoardStage: TaskBoardStage = {
      id: 1,
      boardId: 1,
      name: 'Stage 1',
    };

    subscribe.next(taskBoardStage);
    subscribe.complete();
  });

export const mergeTasksOnTaskBoard: Observable<TaskBoardStage> =
  taskBoardStageObservable.pipe(
    mergeMap((taskBoardStage: TaskBoardStage) => {
      return tasksObservable.pipe(
        map((tasks: Task[]) => {
          const tasksFromBoardStage = tasks.filter(
            (task: Task) => task.boardStageId === taskBoardStage.id,
          );

          if (tasksFromBoardStage.length) {
            return {
              ...taskBoardStage,
              tasks: tasksFromBoardStage,
            };
          }

          return taskBoardStage;
        }),
      );
    }),
  );

function executeMergeTasksOnTaskBoard() {
  mergeTasksOnTaskBoard.subscribe((taskBoardStage) => {
    console.log('rxjs - mergeMap:', taskBoardStage);
    /*
      {
        id: 1,
        boardId: 1,
        name: "Stage 1",
        tasks: [{
          title: "Task 1",
          description: "Description task 1",
          boardId: 1,
          boardStageId: 1
        }, {
          title: "Task 3",
          description: "Description task 3",
          user: {
            id: 1
          },
          boardId: 1,
          boardStageId: 1
        }]
      } 
    */
  });
}
```

Para visualizar a implementação desse fluxo acessar:

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/merge-map/rxjs-merge-map.ts)

### Exemplo com nest-js

[git - Camada de aplicação](https://github.com/Vbobell/nestjs-with-rxjs-example/src/task-board/application/services/task-board/task-board.service.ts#L26-L35)

### Docs

[rxjs](https://rxjs.dev/api/operators/mergeMap)

[learn rxjs](https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergemap)
