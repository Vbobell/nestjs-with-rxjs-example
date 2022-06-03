export abstract class AbstractUseCase<T, K> {
  abstract execute(params?: T): K;
}
