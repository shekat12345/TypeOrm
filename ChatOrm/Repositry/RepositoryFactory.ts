import {DataSource, EntityTarget, Repository, EntityManager} from 'typeorm';
import {GenericRepository} from '.';

export class RepositoryFactory {
  constructor(private dataSource: DataSource) {}

  // Now accepting an optional manager for transaction management
  createRepository<T>(
    entity: EntityTarget<T>,
    manager?: EntityManager,
  ): GenericRepository<T> {
    return manager
      ? manager.getRepository(entity)
      : new GenericRepository<T>(this.dataSource, entity);
  }
}

// import { DataSource } from "typeorm";
// import { GenericRepository } from "./GenericRepository";

// export class RepositoryFactory {
//   constructor(private dataSource: DataSource) {}

//   createRepository<T>(entity: { new (): T }): GenericRepository<T> {
//     return new GenericRepository<T>(this.dataSource, entity);
//   }
// }
