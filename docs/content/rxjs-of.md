## of()

Essa função do `rxjs` transforma um objeto natural javascript em um `Observable`,
onde permite também mais de um parametro de execução.

### Exemplo

O Exemplo converte um objeto natural do tipo `UserEntity` em um `Observable`.

```typescript
import { of } from 'rxjs';

interface UserEntity {
  id: number;
  name: string;
}

const userEntity: UserEntity = {
  id: 1,
  name: 'Joana',
};

function executeObjectToObservable() {
  of(userEntity).subscribe((user) => {
    console.log(user);
    /*
      {
        name: 'Joana',
      }
    */
  });
}

export { executeObjectToObservable };
```

Para visualizar a implementação desse fluxo acessar:

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/map/rxjs-map.ts)

### Exemplo com nest-js

[git](https://vbobell.github.io/nestjs-observable-example/src/user/infra/repository/memory/user/user.repository.ts)

### Docs

[rxjs](https://rxjs.dev/api/index/function/of)
