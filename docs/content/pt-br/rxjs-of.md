## of()

Essa função do `rxjs` transforma uma propriedade ou objeto no tipo `Observable`.

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

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/of/rxjs-of.ts)

### Exemplo com nest-js

### Docs

[rxjs](https://rxjs.dev/api/index/function/of)
[learn rxjs](https://www.learnrxjs.io/learn-rxjs/operators/creation/of)
