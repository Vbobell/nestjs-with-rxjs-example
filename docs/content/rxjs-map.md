## map()

Esse operador do `rxjs` manipula a stream de dados do `Observable`, e a cada chamada do metódo `next`,
acessa o valor do retorno, podendo o manipular e expor essa alteração para o `subscribe`.

### Exemplo

O Exemplo abaixo manipula o `Observable` do tipo `UserEntity` mapeando os dados para o tipo `User`.

```typescript
import { map, Observable } from 'rxjs';

interface UserEntity {
  id: number;
  name: string;
}

interface User {
  name: string;
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

const mapNameUser: Observable<User> = userEntityObservable.pipe(
  map((userEntity: UserEntity) => {
    const user: User = {
      name: userEntity.name,
    };

    return user;
  }),
);

function executeMapNameUser() {
  mapNameUser.subscribe((user) => {
    console.log(user);
    /*
      {
        name: 'Joana',
      }
    */
  });
}

export { executeMapNameUser };
```

Para visualizar a implementação desse fluxo acessar:

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/map/rxjs-map.ts)

### Exemplo com nest-js

[git - Camada de repositório](https://github.com/Vbobell/nestjs-with-rxjs-example/blob/main/src/user/infra/repository/memory/user.repository.ts#L18)

### Docs

[rxjs](https://rxjs.dev/api/operators/map)
[learn rxjs](https://www.learnrxjs.io/learn-rxjs/operators/transformation/map)
