export abstract class Repository<T, K> {
  abstract mapEntityToDomain?(entity: T): K;
  abstract mapEntitiesToDomain?(entities: T[]): K[];
}
