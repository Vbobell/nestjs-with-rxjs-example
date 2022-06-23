export abstract class AbstractRepository<T, K> {
  abstract mapEntityToDomain(entity: T): K;
  abstract mapEntitiesToDomain(entities: T[]): K[];
}
