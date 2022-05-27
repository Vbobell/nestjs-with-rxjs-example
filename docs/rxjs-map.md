## map()

Esse operador do `rxjs` manipula a stream de dados do `Observable` e retorna um novo dado a cada emissão dos dados.

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

[git](https://github.com/Vbobell/nestjs-observable-example/src/user/infra/repository/memory/user/user.repository.ts)

### Docs

[rxjs](https://rxjs.dev/api/operators/map)
