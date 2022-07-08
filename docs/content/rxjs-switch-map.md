## switchMap()

Esse operador do `rxjs` manipula e muda a stream de dados do `Observable`, a cada chamada do metódo `next`
acessa o valor do retorno, mas diferente do `map`, ele muda o contexto da `pipe` para uma nova stream de dados do `Observable`.

### Exemplo

O Exemplo abaixo manipula o `Observable` do tipo `UserEntity` mapeando os dados para o tipo `User`,
e logo após executando uma busca nas tarefas relacionadas ao usuário.

```typescript
import { map, Observable, switchMap } from 'rxjs';

interface UserEntity {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Task {
  title: string;
  description: string;
  user?: Pick<User, 'id'>;
}

interface UserTask {
  user: User;
  tasks: Pick<Task, 'title' | 'description'>[];
}

const userEntityObservable: Observable<UserEntity> = new Observable<UserEntity>(
  (subscribe) => {
    const userEntity: UserEntity = {
      id: 1,
      name: 'Joana',
    };

    subscribe.next(userEntity);
    subscribe.complete();
  },
);

const tasksObservable: Observable<Task[]> = new Observable<Task[]>(
  (subscribe) => {
    const tasks: Task[] = [
      {
        title: 'Task 1',
        description: 'Description task 1',
      },
      {
        title: 'Task 2',
        description: 'Description task 2',
      },
      {
        title: 'Task 3',
        description: 'Description task 3',
        user: {
          id: 1,
        },
      },
    ];

    subscribe.next(tasks);
    subscribe.complete();
  },
);

const findUserTasks: Observable<UserTask> = userEntityObservable.pipe(
  map((userEntity: UserEntity) => {
    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
    };

    return user;
  }),
  switchMap((user: User) => {
    return tasksObservable.pipe(
      map((tasks: Task[]) => {
        const userTasks = tasks.filter((task) => task?.user?.id === user.id);

        return {
          user,
          tasks: userTasks,
        };
      }),
    );
  }),
);

function executeUserTasks() {
  findUserTasks.subscribe((userTasks) => {
    console.log(userTasks);
    /*
      {
        user:{
          id:1,
          name:"Joana"
        },
        tasks:[{
          title: "Task 3",
          description: "Description task 3",
          user:{
            id:1
          }}
        ]} 
    */
  });
}

export { executeUserTasks };
```

Para visualizar a implementação desse fluxo acessar:

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/switch-map/rxjs-switch-map.ts)

### Docs

[rxjs](https://rxjs.dev/api/operators/switchMap)
