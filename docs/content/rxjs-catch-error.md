## catchError()

Esse operador é executado caso seja lançada alguma exceção na stream de dados do `Observable`
ou ao ser executado a chamada do metódo de callback `error` dentro do `Observable`.

### Exemplo

```typescript
import { catchError, map, Observable } from 'rxjs';

interface UserEntity {
  id: number;
  name: string;
}

interface User {
  name: string;
}

const userEntitiesObservable: Observable<UserEntity[]> = new Observable<
  UserEntity[]
>((subscribe) => {
  subscribe.next([
    {
      id: 1,
      name: 'Joana',
    },
    {
      id: 2,
      name: 'Jhon',
    },
    {
      id: 3,
      name: 'Joan',
    },
  ]);

  subscribe.complete();
});

const mapNameUsers: Observable<User[]> = userEntitiesObservable.pipe(
  map((userEntities: UserEntity[]) => {
    const invalidUser = userEntities.some((userEntity) => userEntity.id === 2);

    if (invalidUser) {
      throw new Error('User error');
    }

    return userEntities.map((userEntity: UserEntity) => ({
      name: userEntity.name,
    }));
  }),
  catchError((error: Error) => {
    console.error('userEntitiesObservable error:', error.message);
    throw error;
  }),
);

function executeMapNameUsers() {
  mapNameUsers.subscribe({
    next: (user) => {
      console.log('executeMapNameUsers next', user);
      /*
        {
          name: 'Joana',
        }
      */
    },
    error: (error: Error) => {
      console.error('executeMapNameUsers error:', error.message);
      /*
       User error
      */
    },
  });
}

export { executeMapNameUsers };
```

Para visualizar a implementação desse fluxo acessar:

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/catch-error/rxjs-catch-error.ts)

### Exemplo com nest-js

[git - Camada de repositório](https://github.com/Vbobell/nestjs-with-rxjs-example/blob/main/src/user/infra/repository/sqlite/user.repository.ts#L33)

### Docs

[rxjs](https://rxjs.dev/api/operators/catchError)
[learn rxjs](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch)
