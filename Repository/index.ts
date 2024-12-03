import {DataSource, Repository} from 'typeorm';

export class GenericRepository<T extends DataSource> {
  private repository: Repository<T>;

  constructor(private dataSource: DataSource, private entity: {new (): T}) {
    this.repository = dataSource.getRepository(entity);
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: number | string): Promise<T | null> {
    return this.repository.findOne({where: {id} as any});
  }

  async findAll(relations: any): Promise<T[]> {
    return this.repository.find(relations);
  }

  async update(id: number | string, data: Partial<T>): Promise<T | null> {
    const record = await this.findById(id);
    if (!record) return null;

    const updated = Object.assign(record, data);
    return this.repository.save(updated);
  }

  async delete(id: number | string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
