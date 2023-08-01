export interface IGenericService<I, O> {
    createOne(data: I): Promise<O>;
    fetchAll(query: Record<string, any>): Promise<O[]>;
    findOne(id: number): Promise<O>;
    updateOne(id: number, data: I): Promise<O>;
    removeOne(id: number): Promise<boolean>;
}
