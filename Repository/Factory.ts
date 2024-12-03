import {DataSource, EntityTarget, Repository, EntityManager} from 'typeorm';
import {GenericRepository} from '.';
import {DataSourceDb} from './database';
import {ChatList} from './Table_Entities/ChatList';
import {Message} from './Table_Entities/Messages';

export class RepositoryFactory  {
  constructor(private dataSource: DataSource) {}

  createRepository<T>(
    entity: EntityTarget<T>,
    manager?: EntityManager,
  ): GenericRepository<T> {
    return manager
      ? manager.getRepository(entity)
      : new GenericRepository<T>(this.dataSource, entity);
  }
}
// export const ChatRepository =
export const repositoryFactory = new RepositoryFactory(DataSourceDb);
export const chatRepository = repositoryFactory.createRepository(ChatList);
export const messageRepository = repositoryFactory.createRepository(Message);
