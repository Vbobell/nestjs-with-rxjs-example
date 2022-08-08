## tap()

Esse operador do `rxjs` manipula a stream de dados do `Observable`,
a cada chamada do metódo `next`, acessa o valor do retorno podendo o visualizar os dados,
é ideal para visualização de cada operação realizada na pipe.

### Exemplo

O Exemplo abaixo manipula o `Observable` do tipo `UserEntity`, exibindo cada propriedade na execução do `tap`.

```typescript
import { tap, Observable } from 'rxjs';

interface UserEntity {
  id: number;
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

const tapUserEntity: Observable<UserEntity> = userEntityObservable.pipe(
  tap((userEntity: UserEntity) => {
    console.log(userEntity.id);
    console.log(userEntity.name);
    /*
      // 1
      // 'Joana'
    */
  }),
);

function executeTapUserEntity() {
  tapUserEntity.subscribe((user) => {
    console.log(user);
    /*
     {
      id: 1,
      name: 'Joana',
    };
    */
  });
}

export { executeTapUserEntity };
```

Para visualizar a implementação desse fluxo acessar:

[codesandbox](https://codesandbox.io/s/rxjs-examples-4hrzln?file=/src/examples/tap/rxjs-tap.ts)

### Exemplo com nest-js

No projeto está implementado em todas as camadas `Repository`, `Application` e `Interface`.

[git - Camada de repositório](https://github.com/Vbobell/nestjs-with-rxjs-example/blob/main/src/user/infra/repository/memory/user.repository.ts#L42)
[git - Camada de aplicação](https://github.com/Vbobell/nestjs-with-rxjs-example/blob/main/src/user/application/find-user-by-id/find-user-by-id.use-case.ts#L19)
[git - Camada de interface](https://github.com/Vbobell/nestjs-with-rxjs-example/blob/main/src/user/interface/http/user.controller.ts#L53)

### Docs

[rxjs](https://rxjs.dev/api/operators/tap)
[learn rxjs](https://www.learnrxjs.io/learn-rxjs/operators/utility/do)
