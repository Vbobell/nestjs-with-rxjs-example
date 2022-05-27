## O que é o padrão `Observable`?

`Observable` é um padrão para utilizar programação reativa e funcional, onde o código é executado por demanda, um `Observable` possuí o conceito de `stream` de dados, onde uma resposta da operação pode obter multiplos valores em uma única execução, essa `stream` de dados pode ser manipulada através de uma `pipe` onde a cada operação pode ser manipupado os valores dos dados.

### Principais funções do Observable:

- `next`: Essa operação retorna o próximo valor a ser respondido pela `stream` de dados. EX:

  ```typescript
  import { Observable } from 'rxjs';

  const observable = new Observable<number>((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
  });
  ```

- `complete`: Essa operação completa a execução de um `Observable`, no exemplo a cima, após o retorno de cada execução `next` ele completa a execução do `observable`e encerra a execução.

  ```typescript
  import { Observable } from 'rxjs';

  const observable = new Observable<number>((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);

    observer.complete();
  });
  ```

- `error`: Essa operação executa um erro na `stream` de dados de um observable, onde cancela imediatamente a execução da `stream`, mas ainda executa as operações antes do sua execução. EX:

  ```typescript
  import { Observable } from 'rxjs';

  const observable = new Observable<number>((observer) => {
    observer.next(1);
    observer.error(new Error('Error in stream'));
    observer.next(2);

    observer.complete();
  });
  ```

- `subscribe`: Essa operação faz com que quem a execute se inscreva na `stream` de dados e de fato realize a execução das operações mapeadas no `Observable`, a cada execução da função `next` retorna o seu valor.

  ```typescript
  import { Observable } from 'rxjs';

  const observable = new Observable<number>((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);

    observer.complete();
  });

  observable.subscribe((value) => {
    console.log(value); // 1, 2, 3
  });
  ```

- `unsubscribe`: Essa operação cancela a execução do `stream` de dados, mas ainda mantem as execuções da função `next` antes da sua chamada.

```typescript
import { Observable } from 'rxjs';

const observable = new Observable<number>((observer) => {
  observer.next(1);

  setTimeout(() => {
    observer.unsubscribe();
  }, 100);

  setTimeout(() => {
    observer.next(2);
  }, 200);
});

observable.subscribe((value) => {
  console.log(value); // 1
});
```
