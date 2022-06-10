export abstract class UseCase<T, K> {
  abstract execute(params?: T): K;
}
