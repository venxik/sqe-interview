export interface FindOptions<T> {
  where?: Partial<T>;
  include?: Record<string, boolean>;
  limit?: number;
  offset?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
}

export interface IRepository<T> {
  findOne(options: FindOptions<T>): Promise<T | null>;
  findAll(options?: FindOptions<T>): Promise<T[]>;
  create(data: unknown): Promise<T>;
  update(id: string, data: unknown): Promise<T>;
  delete(id: string): Promise<void>;
  count(options?: FindOptions<T>): Promise<number>;
}
